import { useState } from 'react';
import TariffCalculator from './components/TariffCalculator';
import ShipmentTracker from './components/ShipmentTracker';
import { Package, Calculator, Search } from 'lucide-react';


export default function App() {
    const [activeTab, setActiveTab] = useState<'calculator' | 'tracker'>('calculator');
    const currentYear = new Date().getFullYear();

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
            <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                        <div className="bg-blue-600 p-2 rounded-lg text-white">
                            <Package className="w-5 h-5" />
                        </div>
                        <h1 className="font-semibold text-base sm:text-lg tracking-tight text-slate-100">
                            Courier Logistics RD — MIA -&gt; SDQ
                        </h1>
                    </div>

                    <nav className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
                        <button
                            type="button"
                            onClick={() => setActiveTab('calculator')}
                            className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                                activeTab === 'calculator'
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                            }`}
                        >
                            <Calculator className="w-4 h-4" />
                            <span>Calculadora</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('tracker')}
                            className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                                activeTab === 'tracker'
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                            }`}
                        >
                            <Search className="w-4 h-4" />
                            <span>Rastreo</span>
                        </button>
                    </nav>
                </div>
            </header>

            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
                {activeTab === 'calculator' ? <TariffCalculator /> : <ShipmentTracker />}
            </main>

            <footer className="border-t border-slate-800/80 bg-slate-900/50 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-2.5">
                            <div className="flex items-center gap-2">
                                <div className="bg-blue-600 p-1.5 rounded-md text-white">
                                    <Package className="w-3.5 h-3.5" />
                                </div>
                                <span className="font-semibold text-slate-200">
                  © {currentYear} Courier Logistics RD
                </span>
                            </div>
                            <span className="hidden sm:inline text-slate-600">•</span>
                            <span className="text-slate-500">
                Ruta Internacional Miami (MIA) → República Dominicana (SDQ / LRM)
              </span>
                        </div>

                        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3">
                            <a
                                href="https://github.com/WilfredoAM22"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors font-medium rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                            >
                                <span>Desarrollado por Wilfredo Alexis Mariano</span>
                            </a>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-800/60 text-[11px] text-slate-500">
                        Simulación fiscal referencial basada en el régimen aduanero de la DGA (Ley 168-21 de Aduanas). Los montos mostrados son estimaciones y no sustituyen una liquidación oficial.
                    </div>
                </div>
            </footer>
        </div>
    );
}
