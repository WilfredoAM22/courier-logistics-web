import {CheckCircle2, AlertTriangle, DollarSign, Scale, Package} from 'lucide-react'
import {type QuoteResponse} from '../types/logistics'
 interface QuoteResultCardProps { quote: QuoteResponse | null; }
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
                 <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between gap-5">
                     {quote.taxExempt ? (
                         <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-sm font-medium">
                             <CheckCircle2 className="w-4 h-4 shrink-0" />
                             <span>Exento de Impuestos DGA (&lt;= US$ 200.00)</span>
                         </div>
                     ) : (
                         <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 text-sm font-medium">
                             <AlertTriangle className="w-4 h-4 shrink-0" />
                             <span>Gravado con Impuestos en Cascada</span>
                         </div>
                     )}

                     <div className="space-y-3 text-sm divide-y divide-slate-800">
                         <div className="flex items-center justify-between pt-1">
              <span className="text-slate-400 flex items-center gap-2">
                <Scale className="w-4 h-4 text-slate-500" />
                Peso facturable
              </span>
                             <span className="text-slate-200 font-medium">
                {quote.billableWeight} lbs
              </span>
                         </div>

                         <div className="flex items-center justify-between pt-3">
              <span className="text-slate-400 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-slate-500" />
                Costo de flete
              </span>
                             <span className="text-slate-200 font-medium">
                ${quote.freightCost.toFixed(2)}
              </span>
                         </div>

                         <div className="flex items-center justify-between pt-3">
                             <span className="text-slate-400">Arancel aduanal</span>
                             <span className="text-slate-200 font-medium">
                ${quote.customsDuty.toFixed(2)}
              </span>
                         </div>

                         <div className="flex items-center justify-between pt-3">
                             <span className="text-slate-400">Impuesto Selectivo (ISC)</span>
                             <span className="text-slate-200 font-medium">
                ${quote.selectiveTax.toFixed(2)}
              </span>
                         </div>

                         <div className="flex items-center justify-between pt-3">
                             <span className="text-slate-400">ITBIS (18%)</span>
                             <span className="text-slate-200 font-medium">${quote.itbis.toFixed(2)}</span>
                         </div></div>
                     <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-400">
              Total estimado
            </span><span className="text-xl font-bold text-white">
              ${quote.totalEstimatedCost.toFixed(2)} USD
            </span></div>
                 </div>
             )}
         </>
     );
 }