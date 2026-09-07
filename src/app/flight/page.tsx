import { FlightCard } from "@/components/flight/FlightCard";
import { Flight } from "@/types/flight";

async function getFlights() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/flights`, { cache: 'no-store' });
  const data = await res.json();
  return data.flights; // Check your Laravel response structure
}

export default async function FlightsPage() {
  const flights: Flight[] = await getFlights();

  return (
    <div className="min-h-screen bg-slate-50 p-10">
      <h1 className="text-3xl font-black mb-10">Available Flights</h1>
      <div className="max-w-5xl mx-auto">
        {flights.map((f) => (
          <FlightCard key={f.id} flight={f} />
        ))}
      </div>
    </div>
  );
}