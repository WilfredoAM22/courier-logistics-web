
import { useRef, useState } from 'react';
import { Search, PackagePlus } from 'lucide-react';
import { type ShipmentTrackingResponse } from '../types/logistics';
import SearchTrackingCard from './SearchTrackingCard';
import RegisterShipmentCard from './RegisterShipmentCard';
import ShipmentTimelineCard from './ShipmentTimelineCard';

export default function ShipmentTracker() {
    const [shipment, setShipment] = useState<ShipmentTrackingResponse | null>(null);
    const [mobileView, setMobileView] = useState<'search' | 'register'>('search');

    const timelineRef = useRef<HTMLDivElement>(null);

    function handleShipmentSelected(foundShipment: ShipmentTrackingResponse) {
        setShipment(foundShipment);

        setTimeout(() => {
            timelineRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }, 100);
    }

    return (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">

            <div className="xl:col-span-5 space-y-6">

                <div className="xl:hidden grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800">
                    <button
                        type="button"
                        onClick={() => setMobileView('search')}
                        aria-pressed={mobileView === 'search'}
                        className={`flex items-center justify-center gap-2 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                            mobileView === 'search'
                                ? 'bg-sky-500 text-slate-950'
                                : 'text-slate-400 hover:text-white'
                        }`}
                    >
                        <Search className="w-4 h-4" />
                        Rastrear código
                    </button>

                    <button
                        type="button"
                        onClick={() => setMobileView('register')}
                        aria-pressed={mobileView === 'register'}
                        className={`flex items-center justify-center gap-2 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                            mobileView === 'register'
                                ? 'bg-sky-500 text-slate-950'
                                : 'text-slate-400 hover:text-white'
                        }`}
                    >
                        <PackagePlus className="w-4 h-4" />
                        Registrar en Miami
                    </button>
                </div>

                <div className={mobileView === 'search' ? 'block' : 'hidden xl:block'}>
                    <SearchTrackingCard
                        onShipmentFound={handleShipmentSelected}
                    />
                </div>

                <div className={mobileView === 'register' ? 'block' : 'hidden xl:block'}>
                    <RegisterShipmentCard
                        onShipmentCreated={handleShipmentSelected}
                    />
                </div>
            </div>

            <div
                ref={timelineRef}
                className="xl:col-span-7 scroll-mt-20"
            >
                <ShipmentTimelineCard
                    key={shipment?.trackingNumber ?? 'sin-envio'}
                    shipment={shipment}
                    onShipmentUpdated={setShipment}
                />
            </div>
        </div>
    );
}
