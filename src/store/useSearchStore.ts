import { create } from 'zustand';

interface SearchState {
    from: string;
    to: string;
    departureDate: Date | undefined;
    returnDate: Date | undefined;
    tripType: 'one-way' | 'return';
    passengers: { adult: number; child: number };
    setField: (field: string, value: any) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
    from: 'Karachi (KHI)',
    to: 'Jeddah (JED)',
    departureDate: new Date(),
    returnDate: undefined,
    tripType: 'one-way',
    passengers: { adult: 1, child: 0 },
    setField: (field, value) => set((state) => ({ ...state, [field]: value })),
}));