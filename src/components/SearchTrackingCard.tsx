
import { useState, type FormEvent } from 'react';
import {
    Search,
    AlertCircle,
    ClipboardPaste,
    X,
} from 'lucide-react';
import {
    getShipmentByTracking,
    LogisticsApiError,
} from '../services/logisticsApi';
import { type ShipmentTrackingResponse } from '../types/logistics';

interface SearchTrackingCardProps {
    onShipmentFound: (shipment: ShipmentTrackingResponse) => void;
}

export default function SearchTrackingCard({
                                               onShipmentFound,
                                           }: SearchTrackingCardProps) {
    const [trackingInput, setTrackingInput] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function handlePaste() {
        try {
            const text = await navigator.clipboard.readText();

            setTrackingInput(text.trim().toUpperCase());
            setError(null);
        } catch {
            setError(
                'No se pudo acceder al portapapeles. Verifica los permisos del navegador.'
            );
        }
    }

    function handleClear() {
        setTrackingInput('');
        setError(null);
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!trackingInput.trim()) return;

        setError(null);
        setLoading(true);

        try {
            const result = await getShipmentByTracking(
                trackingInput.trim().toUpperCase()
            );

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
            <h2 className="text-xl font-semibold text-white">
                Rastrear Envío
            </h2>

            {error && (
                <div
                    role="alert"
                    className="flex items-center gap-2 p-3 text-sm text-red-400 bg-red-950/50 border border-red-800/60 rounded-xl"
                >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
            >
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Ej. DOM-MIA-2FB67A"
                        value={trackingInput}
                        onChange={(e) =>
                            setTrackingInput(e.target.value.toUpperCase())
                        }
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck={false}
                        className="w-full h-14 bg-slate-950 border border-slate-800 rounded-xl pl-4 pr-12 font-mono tracking-wider text-base text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />

                    {trackingInput ? (
                        <button
                            type="button"
                            onClick={handleClear}
                            aria-label="Limpiar código de tracking"
                            title="Limpiar"
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 active:scale-[0.98] transition-colors cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handlePaste}
                            aria-label="Pegar código de tracking"
                            title="Pegar código"
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 active:scale-[0.98] transition-colors cursor-pointer"
                        >
                            <ClipboardPaste className="w-4 h-4" />
                        </button>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading || !trackingInput.trim()}
                    className="inline-flex h-14 items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-5 rounded-xl transition-colors active:scale-[0.98] cursor-pointer"
                >
                    <Search className="w-4 h-4" />
                    <span>{loading ? 'Buscando...' : 'Rastrear'}</span>
                </button>
            </form>
        </div>
    );
}
