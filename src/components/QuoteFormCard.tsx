import { useState, type FormEvent } from 'react';
import { Calculator, AlertCircle } from 'lucide-react';
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
                </div>)}

            <div className="space-y-4">
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-1.5">
                        Categoría
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value as ProductCategory)}
                        className="w-full rounded-lg bg-slate-800/80 border border-slate-700 px-3.5 py-2.5 text-sm text-white focus:border-sky-400
                         focus:outline-none focus:ring-1 focus:ring-sky-400 transition-colors"
                    >
                        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                            <option key={key} value={key}>
                                {label}
                            </option>))}</select>
                </div>

                <div>
                    <label htmlFor="weightInLbs" className="block text-sm font-medium text-slate-300 mb-1.5">
                        Peso (lbs)
                    </label>
                    <input
                        id="weightInLbs"
                        type="number"
                        step="0.01"
                        min="0"
                        value={weightInLbs}
                        onChange={(e) => setWeightInLbs(e.target.value)}
                        className={`w-full rounded-lg bg-slate-800/80 border px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${
                            fieldErrors.weightInLbs
                                ? 'border-red-500/60 focus:border-red-400 focus:ring-red-400'
                                : 'border-slate-700 focus:border-sky-400 focus:ring-sky-400'}`}/>
                    {fieldErrors.weightInLbs && (
                        <p className="mt-1.5 text-xs text-red-400">{fieldErrors.weightInLbs}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="fobValue" className="block text-sm font-medium text-slate-300 mb-1.5">
                        Valor FOB (USD)
                    </label><input
                        id="fobValue"
                        type="number"
                        step="0.01"
                        min="0"
                        value={fobValue}
                        onChange={(e) => setFobValue(e.target.value)}
                        className={`w-full rounded-lg bg-slate-800/80 border px-3.5 py-2.5 text-sm text-white placeholder-slate-500
                         focus:outline-none focus:ring-1 transition-colors ${ fieldErrors.fobValue
                                ? 'border-red-500/60 focus:border-red-400 focus:ring-red-400'
                                : 'border-slate-700 focus:border-sky-400 focus:ring-sky-400'}`}/>
                    {fieldErrors.fobValue && (<p className="mt-1.5 text-xs text-red-400">{fieldErrors.fobValue}</p>)}
                </div>
            </div>
            <button type="submit" disabled={loading}
                    className="w-full rounded-lg bg-sky-500 hover:bg-sky-400
                    disabled:opacity-50 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors cursor-pointer">
                {loading ? 'Calculando...': 'Calcular Cotizacion'}
            </button>
        </form>
    );
}
