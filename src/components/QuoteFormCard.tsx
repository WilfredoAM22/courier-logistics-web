
import { useState, type FormEvent } from 'react';
import { Calculator, AlertCircle, Plus, Minus } from 'lucide-react';
import { calculateQuote, LogisticsApiError } from '../services/logisticsApi';
import {
    CATEGORY_LABELS,
    type ProductCategory,
    type QuoteResponse,
} from '../types/logistics';

interface QuoteFormCardProps {
    onQuoteCalculate: (quote: QuoteResponse) => void;
}

export default function QuoteFormCard({ onQuoteCalculate }: QuoteFormCardProps) {
    const [weightInLbs, setWeightInLbs] = useState<string>('2.5');
    const [fobValue, setFobValue] = useState<string>('180.00');
    const [category, setCategory] = useState<ProductCategory>('ELECTRONICS');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const remainingTaxFree = 200 - Number(fobValue || 0);

    function adjustWeight(amount: number) {
        const currentWeight = Number(weightInLbs) || 0;
        const newWeight = Math.max(0.1, currentWeight + amount);

        setWeightInLbs(newWeight.toFixed(2));
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setFieldErrors({});
        setLoading(true);

        try {
            const result = await calculateQuote({
                weightInLbs: Number(weightInLbs),
                fobValue: Number(fobValue),
                category,
            });

            onQuoteCalculate(result);
        } catch (err) {
            if (err instanceof LogisticsApiError) {
                setError(err.message);
                setFieldErrors(err.errors ?? {});
            } else {
                setError('Error al calcular tu cotización');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5"
        >
            <div className="flex items-center gap-2.5">
                <Calculator className="w-5 h-5 text-sky-400 shrink-0" />
                <h2 className="text-lg font-semibold text-white tracking-tight">
                    Calculadora Aduanal DGA
                </h2>
            </div>

            {error && (
                <div
                    role="alert"
                    className="flex items-center gap-2.5 p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                >
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{error}</span>
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <label
                        htmlFor="category"
                        className="block text-sm font-medium text-slate-300 mb-1.5"
                    >
                        Categoría
                    </label>

                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value as ProductCategory)}
                        className="w-full rounded-lg bg-slate-800/80 border border-slate-700 px-3.5 py-2.5 text-sm text-white focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 transition-colors"
                    >
                        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                            <option key={key} value={key}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="weightInLbs"
                        className="block text-sm font-medium text-slate-300 mb-1.5"
                    >
                        Peso (lbs)
                    </label>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            aria-label="Disminuir peso en 0.5 libras"
                            onClick={() => adjustWeight(-0.5)}
                            className="w-14 h-14 shrink-0 flex items-center justify-center rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white active:scale-[0.98] transition-colors cursor-pointer"
                        >
                            <Minus className="w-5 h-5" />
                        </button>

                        <input
                            id="weightInLbs"
                            type="number"
                            inputMode="decimal"
                            step="0.01"
                            min="0.1"
                            value={weightInLbs}
                            onChange={(e) => setWeightInLbs(e.target.value)}
                            className={`w-full min-w-0 h-14 rounded-lg bg-slate-800/80 border px-3.5 text-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${
                                fieldErrors.weightInLbs
                                    ? 'border-red-500/60 focus:border-red-400 focus:ring-red-400'
                                    : 'border-slate-700 focus:border-sky-400 focus:ring-sky-400'
                            }`}
                        />

                        <button
                            type="button"
                            aria-label="Aumentar peso en 0.5 libras"
                            onClick={() => adjustWeight(0.5)}
                            className="w-14 h-14 shrink-0 flex items-center justify-center rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white active:scale-[0.98] transition-colors cursor-pointer"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>

                    {fieldErrors.weightInLbs && (
                        <p className="mt-1.5 text-xs text-red-400">
                            {fieldErrors.weightInLbs}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="fobValue"
                        className="block text-sm font-medium text-slate-300 mb-1.5"
                    >
                        Valor FOB (USD)
                    </label>

                    <input
                        id="fobValue"
                        type="number"
                        inputMode="decimal"
                        step="0.01"
                        min="0"
                        value={fobValue}
                        onChange={(e) => setFobValue(e.target.value)}
                        className={`w-full h-14 rounded-lg bg-slate-800/80 border px-3.5 text-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${
                            fieldErrors.fobValue
                                ? 'border-red-500/60 focus:border-red-400 focus:ring-red-400'
                                : 'border-slate-700 focus:border-sky-400 focus:ring-sky-400'
                        }`}
                    />

                    {fieldErrors.fobValue && (
                        <p className="mt-1.5 text-xs text-red-400">
                            {fieldErrors.fobValue}
                        </p>
                    )}

                    {remainingTaxFree >= 0 ? (
                        <div
                            role="status"
                            className="mt-2.5 flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-3 text-sm text-emerald-400"
                        >
                            <span className="font-medium">
                                Te quedan US$ {remainingTaxFree.toFixed(2)} libres de impuestos DGA
                            </span>
                        </div>
                    ) : (
                        <div
                            role="alert"
                            className="mt-2.5 flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/10 px-3.5 py-3 text-sm text-amber-400"
                        >
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>
                                Tu paquete supera los US$200 FOB. Puede aplicar una evaluación de impuestos aduanales.
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full h-14 rounded-lg bg-sky-500 hover:bg-sky-400 active:scale-[0.98] disabled:opacity-50 px-4 text-base font-semibold text-slate-950 transition-colors cursor-pointer"
            >
                {loading ? 'Calculando...' : 'Calcular Cotización'}
            </button>
        </form>
    );
}
