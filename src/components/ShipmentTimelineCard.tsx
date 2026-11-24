import { useState } from 'react';
import { MapPin, Clock } from 'lucide-react';
import { updateShipmentStatus, LogisticsApiError } from '../services/logisticsApi';
import { STATUS_LABELS, type PackageStatus, type ShipmentTrackingResponse } from '../types/logistics';
interface ShipmentTimelineCardProps {
    shipment: ShipmentTrackingResponse | null;
    onShipmentUpdated: (updated: ShipmentTrackingResponse) => void;
}
export default function ShipmentTimelineCard({ shipment, onShipmentUpdated }:
    ShipmentTimelineCardProps){
    const [nextStatus, setNextStatus] = useState<PackageStatus>('IN_TRANSIT');
    const [location, setLocation] = useState<string>('Aeropuerto Internacional Las Américas (SDQ)');
    const [notes, setNotes] = useState<string>('');
    const [updating, setUpdating] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const handleUpdateStatus = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!shipment) return;

        setError(null);
        setUpdating(true);

        try {
            const updated = await updateShipmentStatus(shipment.trackingNumber, {
                newStatus: nextStatus,
                location: location.trim(),
                notes: notes.trim() || undefined,
            });

            setNotes('');
            onShipmentUpdated(updated);
        } catch (err) {
            if (err instanceof LogisticsApiError) {
                setError(err.message);
            } else {
                setError('Ocurrió un error inesperado al actualizar el estado del envío.');
            }
        } finally {
            setUpdating(false);
        }
    };
    return (
        <div className="max-w-4xl mx-auto p-6">
            {!shipment ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-slate-800 rounded-xl p-8 text-center bg-slate-900">
                    <div className="w-16 h-16 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-100 mb-2">
                        Ningún envío seleccionado
                    </h3>
                    <p className="text-slate-400 max-w-md">
                        Ingresa un código de tracking en el buscador para rastrear un paquete existente o registra uno nuevo recibido en nuestro almacén de Miami.
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h2 className="font-mono text-xl font-bold text-sky-400 tracking-wider mb-1.5">
                                {shipment.trackingNumber}
                            </h2>
                            <div className="mb-2">
                                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                    {shipment.currentStatusDescription}
                                </span>
                            </div>
                            <p className="text-slate-400">{shipment.description}</p>
                        </div>

                        <div className="sm:text-right bg-slate-950/60 px-4 py-3 rounded-lg border border-slate-800">
                            <span className="text-xs uppercase tracking-wider text-slate-400 block font-medium">
                                Total Congelado
                            </span>
                            <span className="text-2xl font-bold text-emerald-400">
                                ${shipment.totalCost.toFixed(2)} USD
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="md:col-span-1">
                            <form
                                onSubmit={handleUpdateStatus}
                                className="bg-slate-900 p-5 rounded-xl shadow-sm border border-slate-800 space-y-4"
                            >
                                <h3 className="font-semibold text-slate-100 border-b border-slate-800 pb-2">
                                    Actualizar Estado
                                </h3>

                                {error && (
                                    <div className="p-3 text-sm text-red-300 bg-red-950/60 border border-red-800/60 rounded-lg">
                                        {error}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">
                                        Nuevo Estado
                                    </label>
                                    <select
                                        value={nextStatus}
                                        onChange={(e) => setNextStatus(e.target.value as PackageStatus)}
                                        className="w-full rounded-lg bg-slate-950 border border-slate-800 text-slate-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        {Object.entries(STATUS_LABELS).map(([key, label]) => (
                                            <option key={key} value={key} className="bg-slate-900 text-slate-100">
                                                {label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">
                                        Ubicación
                                    </label>
                                    <input
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder="Ej. Almacén Miami, Aduanas..."
                                        className="w-full rounded-lg bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">
                                        Notas (Opcional)
                                    </label>
                                    <input
                                        type="text"
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Detalles adicionales..."
                                        className="w-full rounded-lg bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={updating}
                                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors cursor-pointer"
                                >
                                    {updating ? 'Actualizando...' : 'Actualizar Estado'}
                                </button>
                            </form>
                        </div>

                        <div className="md:col-span-2 bg-slate-900 p-5 rounded-xl shadow-sm border border-slate-800 space-y-4">
                            <h3 className="font-semibold text-slate-100 border-b border-slate-800 pb-3 flex items-center gap-2">
                                <Clock className="w-4 h-4 text-sky-400" />
                                Historial de Movimientos
                            </h3>

                            <div className="relative border-l-2 border-slate-800 ml-3 space-y-6">
                                {shipment.history.map((event, index) => (
                                    <div key={`${event.status}-${index}`} className="relative pl-6">
                                        <span
                                            className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-slate-900 ${
                                                index === 0 ? 'bg-blue-500 ring-4 ring-blue-500/20' : 'bg-slate-600'
                                            }`}
                                        />

                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                                            <h4 className="font-semibold text-slate-100">
                                                {event.statusDescription}
                                            </h4>
                                            <span className="text-xs text-slate-400">
                                                {new Date(event.timestamp).toLocaleString('es-DO')}
                                            </span>
                                        </div>

                                        <p className="text-sm font-medium text-blue-400 mt-0.5 flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                                            {event.location}
                                        </p>

                                        {event.notes && (
                                            <p className="text-xs text-slate-400 mt-1">
                                                {event.notes}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}