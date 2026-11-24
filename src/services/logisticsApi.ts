import type {
    ApiErrorResponse,
    CreateShipmentRequest,
    QuoteRequest,
    QuoteResponse,
    ShipmentTrackingResponse,
    UpdateStatusRequest,
} from '../types/logistics';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8081/api/v1';

export class LogisticsApiError extends Error {
    status: string;
    errors?: Record<string, string>;

    constructor(
        message: string,
        status: string,
        errors?: Record<string, string>
    ) {
        super(message);
        this.name = 'LogisticsApiError';
        this.status = status;
        this.errors = errors;
    }
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
    });

    if (!response.ok) {
        let errorData: ApiErrorResponse | undefined;

        try {
            errorData = (await response.json()) as ApiErrorResponse;
        } catch {
            throw new LogisticsApiError(`Error HTTP ${response.status}`, 'http_error');
        }

        throw new LogisticsApiError(
            errorData.message,
            errorData.status,
            errorData.errors
        );
    }

    return response.json() as Promise<T>;
}

export function calculateQuote(payload: QuoteRequest): Promise<QuoteResponse> {
    return request<QuoteResponse>('/quotes', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

export function updateShipmentStatus(
    trackingNumber: string,
    payload: UpdateStatusRequest
): Promise<ShipmentTrackingResponse> {
    return request<ShipmentTrackingResponse>(
        `/shipments/${encodeURIComponent(trackingNumber.trim())}/status`,
        {
            method: 'PATCH',
            body: JSON.stringify(payload),
        }
    );
}


export function createShipment(
    payload: CreateShipmentRequest
): Promise<ShipmentTrackingResponse> {
    return request<ShipmentTrackingResponse>('/shipments', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

export function getShipmentByTracking(
    trackingNumber: string
): Promise<ShipmentTrackingResponse> {
    return request<ShipmentTrackingResponse>(
        `/shipments/${encodeURIComponent(trackingNumber.trim())}`
    );
}
