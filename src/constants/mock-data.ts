import { UmrahGroup } from "@/types/umrah-group";

export const mockGroups: UmrahGroup[] = [
    {
        id: 1,
        name: "Premium Umrah Group - Nov",
        group_no: "GRP-78601",
        pnr_number: "PNR12345", // Is PNR se hum detail search karenge
        total_seats: 50,
        available_seats: 12,
        departure_date: "2024-11-15",
        return_date: "2024-11-30",
        days: 15,
        nights: 14,
        price: 185000,
        childe_rate: 165000,
        infent_rate: 45000,
        kg_allowance: "40kg",
        supplier_id: 1,
        flights: [
            {
                id: 101,
                name: "Saudi Airlines",
                pnr_number: "PNR12345",
                logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Saudia_Logo.svg/1200px-Saudia_Logo.svg.png",
                flight_number: "SV-730",
                seats: 50,
                from_place: "LHE",
                to_place: "JED",
                departure_time: "14:30",
                arrival_time: "18:45",
                price: 90000,
                type: "Going",
                class_type: "Economy",
                status: "Active",
                duration: "6h 15m",
                pivot: {
                    group_id: 1,
                    flight_id: 101,
                    type: 'going',
                    departure_date: "2024-11-15",
                    return_date: "2024-11-15",
                    price: 90000
                }
            },
            {
                id: 102,
                name: "Saudi Airlines",
                pnr_number: "PNR12345",
                logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Saudia_Logo.svg/1200px-Saudia_Logo.svg.png",
                flight_number: "SV-731",
                seats: 50,
                from_place: "JED",
                to_place: "LHE",
                departure_time: "22:00",
                arrival_time: "04:00",
                price: 95000,
                type: "Return",
                class_type: "Economy",
                status: "Active",
                duration: "6h 0m",
                pivot: {
                    group_id: 1,
                    flight_id: 102,
                    type: 'return',
                    departure_date: "2024-11-30",
                    return_date: "2024-11-30",
                    price: 95000
                }
            }
        ]
    }
];