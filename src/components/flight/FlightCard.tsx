"use client"
import { Flight } from "@/types/flight";
import { useBookingStore } from "@/store/useBookingStore";
import { useRouter } from "next/navigation";
import { Plane } from "lucide-react";

export const FlightCard = ({ flight }: { flight: Flight }) => {
  const setFlight = useBookingStore((state) => state.setFlight);
  const router = useRouter();

  const handleBooking = () => {
    setFlight(flight); // Store mein save karo
    router.push(`/ticket/${flight.id}`); // Ticket page pe le jao
  };

  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl flex items-center justify-between mb-4">
      <div className="flex items-center gap-4">
        <img src={flight.logo} className="w-12 h-12 object-contain" alt="logo" />
        <div>
          <h3 className="font-bold">{flight.name}</h3>
          <p className="text-xs text-slate-400">{flight.class_type}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-10">
        <div className="text-center">
          <p className="text-xl font-black">{flight.departure_time}</p>
          <p className="text-xs text-slate-500">{flight.from_place}</p>
        </div>
        <Plane className="text-blue-500 rotate-90" />
        <div className="text-center">
          <p className="text-xl font-black">{flight.arrival_time}</p>
          <p className="text-xs text-slate-500">{flight.to_place}</p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-2xl font-black text-blue-600">PKR {flight.price}</p>
        <button 
          onClick={handleBooking}
          className="bg-slate-900 text-white px-6 py-2 rounded-xl text-sm font-bold mt-2 hover:bg-blue-600 transition-all"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};