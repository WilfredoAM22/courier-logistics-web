
import {
    CheckCircle2,
    AlertTriangle,
    DollarSign,
    Scale,
    Package,
    Plane,
    MapPin,
} from 'lucide-react';
import { type QuoteResponse } from '../types/logistics';

interface QuoteResultCardProps {
    quote: QuoteResponse | null;
}

export default function QuoteResultCard({ quote }: QuoteResultCardProps) {
    return (
        <>
            {!quote ? (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-[280px]">
                    <Package className="w-10 h-10 text-slate-600 mb-3" />

                    <h3 className="text-slate-200 font-medium mb-1">
                        Calcula tu tarifa de envío
                    </h3>

                    <p className="text-slate-400 text-sm max-w-xs">
                        Ingresa el peso y el valor de tu paquete para calcular el flete y los impuestos DGA estimados.
                    </p>
                </div>
            ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-5">

                    {quote.taxExempt ? (
                        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-sm font-medium">
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                            <span>Exento de Impuestos DGA (≤ US$ 200.00)</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 text-sm font-medium">
                            <AlertTriangle className="w-4 h-4 shrink-0" />
                            <span>Gravado con Impuestos en Cascada</span>
                        </div>
                    )}

                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-medium uppercase tracking-wider mb-2">
                            <DollarSign className="w-4 h-4" />
                            Total estimado a pagar
                        </div>

                        <p className="text-3xl font-extrabold font-mono tabular-nums text-white">
                            ${quote.totalEstimatedCost.toFixed(2)}
                            <span className="text-sm font-medium text-slate-400 ml-2">
                                USD
                            </span>
                        </p>
                    </div>

                    <div className="flex items-center justify-between px-2 py-2">
                        <div className="flex items-center gap-2">
                            <Plane className="w-4 h-4 text-sky-400" />
                            <div>
                                <p className="text-white font-semibold text-sm">MIA</p>
                                <p className="text-slate-500 text-xs">Miami</p>
                            </div>
                        </div>

                        <div className="flex-1 flex items-center gap-2 px-4">
                            <div className="h-px flex-1 border-t border-dashed border-slate-600" />
                            <Plane className="w-4 h-4 text-sky-400" />
                            <div className="h-px flex-1 border-t border-dashed border-slate-600" />
                        </div>

                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-emerald-400" />
                            <div>
                                <p className="text-white font-semibold text-sm">SDQ</p>
                                <p className="text-slate-500 text-xs">Santo Domingo</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Desglose del envío
                        </h3>

                        <div className="relative pl-5 border-l-2 border-dashed border-slate-700 space-y-3.5">

                            <div className="relative">
                                <span className="absolute -left-[25px] top-1.5 w-2.5 h-2.5 rounded-full bg-sky-400 ring-4 ring-slate-900" />

                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <p className="text-slate-300 text-sm font-medium">
                                            1. Flete Miami → RD
                                        </p>
                                        <p className="text-slate-500 text-xs mt-0.5">
                                            Peso facturable: {quote.billableWeight} lbs
                                        </p>
                                    </div>

                                    <span className="text-slate-200 font-medium font-mono tabular-nums text-sm whitespace-nowrap">
                                        ${quote.freightCost.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {quote.taxExempt ? (
                                <div className="relative">
                                    <span className="absolute -left-[25px] top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-slate-900" />

                                    <div className="flex items-center justify-between gap-3">
                                        <p className="text-slate-300 text-sm font-medium">
                                            Impuestos DGA (Exento ≤ US$ 200)
                                        </p>

                                        <span className="text-emerald-400 font-semibold font-mono tabular-nums text-sm whitespace-nowrap">
                                            $0.00
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="relative">
                                        <span className="absolute -left-[25px] top-1.5 w-2.5 h-2.5 rounded-full bg-amber-400 ring-4 ring-slate-900" />

                                        <div className="flex items-center justify-between gap-3">
                                            <p className="text-slate-300 text-sm font-medium">
                                                2. Arancel aduanal
                                            </p>

                                            <span className="text-slate-200 font-medium font-mono tabular-nums text-sm whitespace-nowrap">
                                                ${quote.customsDuty.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <span className="absolute -left-[25px] top-1.5 w-2.5 h-2.5 rounded-full bg-amber-400 ring-4 ring-slate-900" />

                                        <div className="flex items-center justify-between gap-3">
                                            <p className="text-slate-300 text-sm font-medium">
                                                3. Impuesto Selectivo (ISC)
                                            </p>

                                            <span className="text-slate-200 font-medium font-mono tabular-nums text-sm whitespace-nowrap">
                                                ${quote.selectiveTax.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <span className="absolute -left-[25px] top-1.5 w-2.5 h-2.5 rounded-full bg-amber-400 ring-4 ring-slate-900" />

                                        <div className="flex items-center justify-between gap-3">
                                            <p className="text-slate-300 text-sm font-medium">
                                                4. ITBIS (18%)
                                            </p>

                                            <span className="text-slate-200 font-medium font-mono tabular-nums text-sm whitespace-nowrap">
                                                ${quote.itbis.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
