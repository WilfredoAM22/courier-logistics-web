import { useState } from 'react';
import { type ShipmentTrackingResponse } from '../types/logistics';
import SearchTrackingCard from './SearchTrackingCard';
import RegisterShipmentCard from './RegisterShipmentCard';
import ShipmentTimelineCard from './ShipmentTimelineCard';
export default function ShipmentTracker(){
    const [shipment, setShipment] = useState<ShipmentTrackingResponse | null>(null);

    return (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            <div className="xl:col-span-5 space-y-6">
                <SearchTrackingCard onShipmentFound={setShipment} />
                <RegisterShipmentCard onShipmentCreated={setShipment} />
            </div>
            <div className="xl:col-span-7">
                <ShipmentTimelineCard
                    key={shipment?.trackingNumber ?? 'sin-envio'}
                    shipment={shipment}
                    onShipmentUpdated={setShipment}
                />
            </div>
        </div>
    );
}