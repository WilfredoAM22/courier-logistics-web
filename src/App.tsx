
import { useState } from 'react';
import TariffCalculator from './components/TariffCalculator';
import ShipmentTracker from './components/ShipmentTracker';
import { Package, Calculator, Search } from 'lucide-react';

export default function App() {
    const [activeTab, setActiveTab] = useState('calculator');
    const currentYear = new Date().getFullYear();

    function handleReload() {
        window.location.reload();
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col pb-16 md:pb-0">

            <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

                    <button
                        type="button"
                        onClick={handleReload}
                        aria-label="Recargar Courier Logistics RD"
                        className="flex items-center gap-2.5 text-left rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 cursor-pointer"
                    >
                        <div className="bg-blue-600 p-2 rounded-lg text-white">
                            <Package className="w-5 h-5" />
                        </div>

                        <span className="font-semibold text-base sm:text-lg tracking-tight text-slate-100">
                            Courier Logistics RD
                            <span className="hidden sm:inline"> — MIA -&gt; SDQ</span>
                        </span>
                    </button>

                    <nav
                        aria-label="Navegación principal"
                        className="hidden md:flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800"
                    >
                        <button
                            type="button"
                            onClick={() => setActiveTab('calculator')}
                            aria-pressed={activeTab === 'calculator'}
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
                            aria-pressed={activeTab === 'tracker'}
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

            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-6 md:py-8">
                {activeTab === 'calculator'
                    ? <TariffCalculator />
                    : <ShipmentTracker />
                }
            </main>

            <footer className="border-t border-slate-800/80 bg-slate-900/50 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">

                    <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">

                        <div className="flex flex-col items-center gap-3 md:flex-row md:gap-2.5">

                            <div className="flex items-center gap-2">
                                <div className="bg-blue-600 p-1.5 rounded-md text-white">
                                    <Package className="w-3.5 h-3.5" />
                                </div>

                                <span className="font-semibold text-sm text-slate-200">
                                    Courier Logistics RD
                                </span>
                            </div>

                            <span className="hidden md:inline text-slate-600">•</span>

                            <div className="flex flex-col items-center gap-1 md:flex-row md:gap-2">
                                <span className="text-xs text-slate-500">
                                    Ruta Internacional
                                </span>

                                <span className="text-xs font-medium text-slate-400">
                                    MIA → SDQ / LRM
                                </span>
                            </div>

                        </div>

                        <a
                            href="https://github.com/WilfredoAM22"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center text-xs text-sky-400 hover:text-sky-300 transition-colors font-medium rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                        >
                            Desarrollado por Wilfredo Alexis Mariano
                        </a>

                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/60 text-center">
                        <span className="text-[11px] text-slate-500">
                            © {currentYear} Courier Logistics RD
                        </span>
                    </div>

                    <div className="mt-3 md:mt-4 md:pt-4 md:border-t md:border-slate-800/60">
                        <p className="text-[10px] leading-relaxed text-slate-500 text-center md:text-left">
                            Simulación fiscal referencial basada en el régimen aduanero de la DGA (Ley 168-21 de Aduanas).
                            Los montos mostrados son estimaciones y no sustituyen una liquidación oficial.
                        </p>
                    </div>

                </div>
            </footer>

            <nav
                aria-label="Navegación móvil"
                className="md:hidden fixed bottom-0 inset-x-0 z-50 min-h-16 pb-[env(safe-area-inset-bottom)] grid grid-cols-2 bg-slate-900/95 backdrop-blur-md border-t border-slate-800"
            >
                <button
                    type="button"
                    onClick={() => setActiveTab('calculator')}
                    aria-pressed={activeTab === 'calculator'}
                    className={`min-h-16 flex flex-col items-center justify-center gap-1 transition-colors active:bg-slate-800/60 ${
                        activeTab === 'calculator'
                            ? 'text-blue-400'
                            : 'text-slate-400 hover:text-slate-200'
                    }`}
                >
                    <Calculator className="w-5 h-5" />
                    <span className="text-xs font-medium">Calculadora</span>
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab('tracker')}
                    aria-pressed={activeTab === 'tracker'}
                    className={`min-h-16 flex flex-col items-center justify-center gap-1 transition-colors active:bg-slate-800/60 ${
                        activeTab === 'tracker'
                            ? 'text-blue-400'
                            : 'text-slate-400 hover:text-slate-200'
                    }`}
                >
                    <Search className="w-5 h-5" />
                    <span className="text-xs font-medium">Rastreo</span>
                </button>
            </nav>

        </div>
    );
}
