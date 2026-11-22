export type ProductCategory =
    'ELECTRONICS' |
    'CLOTHING' |
    'BOOKS' |
    'SUPPLEMENTS' |
    'TOYS' |
    'DOCUMENTS' |
    'ACCESSORIES' |
    'GENERAL';
export type PackageStatus =
    'RECEIVED_MIAMI' |
    'IN_TRANSIT' |
    'CUSTOMS_CLEARANCE' |
    'READY_FOR_PICKUP' |
    'DELIVERED' |
    'CANCELLED';
export interface QuoteResponse{
    billableWeight: number;
    fobValue: number;
    freightCost: number;
    customsDuty: number;
    selectiveTax: number;
    itbis: number;
    totalEstimatedCost: number;
    taxExempt:boolean;
}
export interface TrackingResponse{
    status: PackageStatus;
    statusDescription: string;
    location: string;
    notes: string | null;
    timestamp: string;
}
export interface ShipmentTrackingResponse{
   trackingNumber: string;
   description: string;
   weightInLbs: number;
   category: ProductCategory;
   currentStatus: PackageStatus;
   currentStatusDescription: string;
   fobValue: number;
   freightCost: number;
   customsDuty: number;
   selectiveTax: number;
   itbis: number;
   totalCost: number;
   createdAt: string;
   history: TrackingResponse[];

}
export interface ApiErrorResponse{
    status: string;
    message: string;
    errors: Record<string, string>;
}
export const CATEGORY_LABELS: Record<ProductCategory, string> = {
    ELECTRONICS: 'Electrónica',
    CLOTHING: 'Ropa y calzado',
    BOOKS: 'Libros',
    SUPPLEMENTS: 'Suplementos y vitaminas',
    TOYS: 'Juguetes',
    DOCUMENTS: 'Documentos',
    ACCESSORIES: 'Accesorios',
    GENERAL: 'Mercancía general',
};

export const STATUS_LABELS: Record<PackageStatus, string> = {
    RECEIVED_MIAMI: 'Recibido en Miami',
    IN_TRANSIT: 'En tránsito',
    CUSTOMS_CLEARANCE: 'En proceso aduanal',
    READY_FOR_PICKUP: 'Listo para retirar',
    DELIVERED: 'Entregado',
    CANCELLED: 'Cancelado',
};
export interface QuoteRequest{
    weightInLbs: number;
    fobValue: number;
    category: ProductCategory;
}
export interface CreateShipmentRequest{
    description: string;
    weightInLbs: number;
    fobValue: number;
    category: ProductCategory;
    originLocation: string;

}
export interface UpdateStatusRequest{
    newStatus:PackageStatus;
    location: string;
    notes?: string;
}
