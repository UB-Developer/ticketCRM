import { Flight } from "./flight";

export interface UmrahGroup {
    id: number;
    name: string;
    group_no: string;
    pnr_number: string;
    total_seats: number;
    available_seats: number;
    departure_date: string;
    return_date: string;
    days: number;
    nights: number;
    price: number;
    childe_rate: number;
    infent_rate: number;
    kg_allowance: string;
    supplier_id: number;
    supplier?: {
        id: number;
        name: string;
    };
    flights: Flight[];
}