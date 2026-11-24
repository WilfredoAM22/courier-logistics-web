import { useState, type FormEvent } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { getShipmentByTracking, LogisticsApiError } from '../services/logisticsApi';
import { type ShipmentTrackingResponse } from '../types/logistics';

interface SearchTrackingCardProps {
    onShipmentFound: (shipment: ShipmentTrackingResponse) => void;
}

export default function SearchTrackingCard({ onShipmentFound }: SearchTrackingCardProps) {
    const [trackingInput, setTrackingInput] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!trackingInput.trim()) return;
        setError(null);
        setLoading(true);

        try {
            const result = await getShipmentByTracking(trackingInput.trim());
            onShipmentFound(result);
        } catch (err) {
            if (err instanceof LogisticsApiError) {
                setError(err.message);
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Ocurrió un error al buscar el envío.');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white">Rastrear Envío</h2>

            {error && (
                <div className="flex items-center gap-2 p-3 text-sm text-red-400 bg-red-950/50 border border-red-800/60 rounded-xl">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    placeholder="Ej. DOM-MIA-2FB67A"
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value.toUpperCase())}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-5 py-2.5 rounded-xl transition-colors"
                >
                    <Search className="w-4 h-4" />
                    <span>{loading ? "Buscando..." : "Rastrear"}</span>
                </button>
            </form>
        </div>
    );
}
