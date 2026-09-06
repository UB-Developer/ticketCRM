export interface Flight {
    id: number;
    name: string;
    pnr_number: string;
    logo: string;
    flight_number: string;
    seats: number;
    from_place: string;
    to_place: string;
    departure_time: string;
    arrival_time: string;
    price: string | number;
    type: string;
    class_type: string;
    status: 'Active' | 'Inactive';
    description?: string;
    stops?: number;
    duration?: string;
    pivot?: {
        group_id: number;
        flight_id: number;
        type: 'going' | 'return';
        departure_date: string;
        return_date: string;
        price: string | number;
    };
}