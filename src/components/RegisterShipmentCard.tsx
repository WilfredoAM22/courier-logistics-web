
import { useState, type FormEvent } from 'react';
import { PackagePlus, AlertCircle } from 'lucide-react';
import {
    LogisticsApiError,
    createShipment,
} from '../services/logisticsApi';
import {
    CATEGORY_LABELS,
    type ProductCategory,
    type ShipmentTrackingResponse,
} from '../types/logistics';

interface RegisterShipmentCardProps {
    onShipmentCreated: (shipment: ShipmentTrackingResponse) => void;
}

export default function RegisterShipmentCard({
                                                 onShipmentCreated,
                                             }: RegisterShipmentCardProps) {
    const [description, setDescription] = useState<string>('');
    const [weightInLbs, setWeightInLbs] = useState<string>('3.5');
    const [fobValue, setFobValue] = useState<string>('150.00');
    const [category, setCategory] = useState<ProductCategory>('ELECTRONICS');
    const [originLocation, setOriginLocation] = useState<string>(
        'Almacén Doral, Miami, FL'
    );
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setError(null);
        setFieldErrors({});
        setLoading(true);

        try {
            const created = await createShipment({
                description: description.trim(),
                weightInLbs: Number(weightInLbs),
                fobValue: Number(fobValue),
                category,
                originLocation: originLocation.trim(),
            });

            setDescription('');
            onShipmentCreated(created);
        } catch (err) {
            if (err instanceof LogisticsApiError) {
                setError(err.message);
                setFieldErrors(err.errors ?? {});
            } else {
                setError('No se pudo registrar su envío');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2">
                <PackagePlus className="w-5 h-5 text-sky-400" />
                <h2 className="text-lg font-semibold text-slate-100">
                    Registrar Paquete en Miami
                </h2>
            </div>

            {error && (
                <div
                    role="alert"
                    className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                        Descripción
                    </label>

                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Ej. Laptop MacBook Air M3"
                        autoCapitalize="sentences"
                        className="w-full h-14 px-3.5 text-base bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500"
                    />

                    {fieldErrors.description && (
                        <p className="mt-1 text-xs text-red-400">
                            {fieldErrors.description}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                        Categoría
                    </label>

                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value as ProductCategory)
                        }
                        className="w-full h-14 px-3.5 text-base bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-sky-500"
                    >
                        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                            <option key={key} value={key}>
                                {label}
                            </option>
                        ))}
                    </select>

                    {fieldErrors.category && (
                        <p className="mt-1 text-xs text-red-400">
                            {fieldErrors.category}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                            Peso (lbs)
                        </label>

                        <input
                            type="number"
                            inputMode="decimal"
                            min="0.01"
                            step="0.01"
                            value={weightInLbs}
                            onChange={(e) => setWeightInLbs(e.target.value)}
                            className="w-full h-14 px-3.5 text-base bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-sky-500"
                        />

                        {fieldErrors.weightInLbs && (
                            <p className="mt-1 text-xs text-red-400">
                                {fieldErrors.weightInLbs}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                            Valor FOB (USD)
                        </label>

                        <input
                            type="number"
                            inputMode="decimal"
                            min="0"
                            step="0.01"
                            value={fobValue}
                            onChange={(e) => setFobValue(e.target.value)}
                            className="w-full h-14 px-3.5 text-base bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-sky-500"
                        />

                        {fieldErrors.fobValue && (
                            <p className="mt-1 text-xs text-red-400">
                                {fieldErrors.fobValue}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                        Ubicación de origen
                    </label>

                    <input
                        type="text"
                        value={originLocation}
                        onChange={(e) => setOriginLocation(e.target.value)}
                        placeholder="Ej. Almacén Doral, Miami, FL"
                        className="w-full h-14 px-3.5 text-base bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500"
                    />

                    {fieldErrors.originLocation && (
                        <p className="mt-1 text-xs text-red-400">
                            {fieldErrors.originLocation}
                        </p>
                    )}
                </div>

                <p className="text-xs text-slate-400">
                    Al registrar el paquete en Miami, la tarifa se calculará y
                    congelará automáticamente según el peso y el valor FOB ingresados.
                </p>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 px-4 text-base bg-sky-500 hover:bg-sky-400 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-semibold rounded-xl transition-colors cursor-pointer"
                >
                    {loading ? 'Registrando...' : 'Registrar Paquete'}
                </button>
            </form>
        </div>
    );
}
