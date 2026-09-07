"use client"
import { useBookingStore } from "@/store/useBookingStore";
import { Ticket as TicketIcon, Download, Share2, Plane } from "lucide-react";

export default function TicketPage() {
  const flight = useBookingStore((state) => state.selectedFlight);

  if (!flight) return <div className="p-20 text-center uppercase font-black">No Ticket Found...</div>;

  return (
    <div className="min-h-screen bg-zinc-900 p-6 lg:p-20 flex flex-col items-center">
      {/* Premium Header */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-10">
        <h2 className="text-white text-2xl font-black tracking-tighter italic">SKY-TICKET</h2>
        <div className="flex gap-4">
          <button className="bg-white/10 p-3 rounded-full text-white hover:bg-white/20 transition-all"><Download size={20}/></button>
          <button className="bg-white/10 p-3 rounded-full text-white hover:bg-white/20 transition-all"><Share2 size={20}/></button>
        </div>
      </div>

      {/* The Actual Ticket UI */}
      <div className="w-full max-w-4xl bg-white rounded-[3rem] overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)]">
        <div className="bg-blue-600 p-8 text-white flex justify-between">
            <div>
                <p className="text-xs uppercase font-bold opacity-60">Boarding Pass</p>
                <h1 className="text-4xl font-black leading-none">{flight.name}</h1>
            </div>
            <TicketIcon size={40} className="opacity-20" />
        </div>
        
        <div className="p-10 grid grid-cols-3 gap-10 items-center">
            <div className="text-center lg:text-left">
                <p className="text-5xl font-black text-slate-800">{flight.from_place.substring(0,3).toUpperCase()}</p>
                <p className="text-sm font-bold text-slate-400">{flight.from_place}</p>
                <p className="mt-4 text-xl font-bold">{flight.departure_time}</p>
            </div>

            <div className="flex flex-col items-center">
                <Plane className="text-blue-600 rotate-90 w-10 h-10 mb-2" />
                <div className="w-full h-[1px] border-b-2 border-dashed border-slate-200" />
                <p className="mt-2 text-[10px] font-bold text-slate-400">FLIGHT: {flight.flight_number}</p>
            </div>

            <div className="text-center lg:text-right">
                <p className="text-5xl font-black text-slate-800">{flight.to_place.substring(0,3).toUpperCase()}</p>
                <p className="text-sm font-bold text-slate-400">{flight.to_place}</p>
                <p className="mt-4 text-xl font-bold">{flight.arrival_time}</p>
            </div>
        </div>

        {/* Footer with QR Section */}
        <div className="bg-slate-50 p-10 border-t-2 border-dashed border-slate-200 flex justify-between items-center">
            <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Passenger Name</p>
                <p className="text-xl font-black text-slate-800">JANI DEVELOPER</p>
            </div>
            <div className="w-24 h-24 bg-white border p-2 rounded-xl">
               {/* QR IMAGE HERE */}
               <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SkyTicket-123" alt="qr" />
            </div>
        </div>
      </div>
    </div>
  );
}