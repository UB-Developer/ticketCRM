import { create } from 'zustand';
import { Flight } from '@/types/flight';

interface BookingStore {
    selectedFlight: Flight | null;
    setFlight: (flight: Flight) => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
    selectedFlight: null,
    setFlight: (flight) => set({ selectedFlight: flight }),
}));