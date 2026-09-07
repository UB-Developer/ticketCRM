
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlaneTakeoff,
  PlaneLanding,
  Calendar as CalIcon,
  Users,
  ArrowRightLeft,
  Search,
  Plane,
  MapPin,
  X,
  Plus,
  Trash2,
  Menu,
  Clock3,
  ChevronDown,
  Luggage,
  SlidersHorizontal,
  Star,
  Check,
} from "lucide-react";

// ======================================================
// TYPES
// ======================================================

interface Location {
  city: string;
  code: string;
  country: string;
}

interface FlightSegment {
  id: string;
  from: Location;
  to: Location;
  date: Date;
}

interface Flight {
  id: number;
  airline: string;
  logo: string;
  flightNo: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  departure: string;
  arrival: string;
  duration: string;
  stops: string;
  price: number;
  baggage: string;
  featured?: boolean;
}

// ======================================================
// MOCK DATA
// ======================================================

const locations: Location[] = [
  { city: "Karachi", code: "KHI", country: "Pakistan" },
  { city: "Jeddah", code: "JED", country: "Saudi Arabia" },
  { city: "Dubai", code: "DXB", country: "UAE" },
  { city: "London", code: "LHR", country: "UK" },
  { city: "Istanbul", code: "IST", country: "Turkey" },
  { city: "Riyadh", code: "RUH", country: "Saudi Arabia" },
];

const flights: Flight[] = [
  {
    id: 1,
    airline: "Saudi Airlines",
    logo: "SV",
    flightNo: "SV-701",
    from: "Karachi",
    fromCode: "KHI",
    to: "Jeddah",
    toCode: "JED",
    departure: "02:15",
    arrival: "05:45",
    duration: "5h 30m",
    stops: "Non-stop",
    price: 78500,
    baggage: "30 KG",
    featured: true,
  },
  {
    id: 2,
    airline: "Emirates",
    logo: "EK",
    flightNo: "EK-603",
    from: "Karachi",
    fromCode: "KHI",
    to: "Dubai",
    toCode: "DXB",
    departure: "04:10",
    arrival: "05:55",
    duration: "2h 45m",
    stops: "Non-stop",
    price: 63500,
    baggage: "30 KG",
  },
  {
    id: 3,
    airline: "PIA",
    logo: "PK",
    flightNo: "PK-739",
    from: "Karachi",
    fromCode: "KHI",
    to: "Jeddah",
    toCode: "JED",
    departure: "08:30",
    arrival: "11:55",
    duration: "5h 25m",
    stops: "Non-stop",
    price: 69500,
    baggage: "40 KG",
  },
];

// ======================================================
// MAIN COMPONENT
// ======================================================

export default function FlightSearch() {
  const [tripType, setTripType] = useState("Return");

  const [segments, setSegments] = useState<FlightSegment[]>([
    {
      id: "1",
      from: locations[0],
      to: locations[1],
      date: new Date(),
    },
    {
      id: "2",
      from: locations[1],
      to: locations[2],
      date: new Date(Date.now() + 86400000 * 7),
    },
  ]);

  const [returnDate, setReturnDate] = useState<Date | null>(
    new Date(Date.now() + 86400000 * 14)
  );

  const [activeSearch, setActiveSearch] = useState<{
    index: number;
    type: "from" | "to";
  } | null>(null);

  const [activeCalendar, setActiveCalendar] = useState<
    number | "return" | null
  >(null);

  const [showPassengers, setShowPassengers] = useState(false);

  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const [searched, setSearched] = useState(true);

  // ======================================================
  // SEGMENTS
  // ======================================================

  const addSegment = () => {
    if (segments.length >= 5) return;

    const last = segments[segments.length - 1];

    setSegments([
      ...segments,
      {
        id: Math.random().toString(36).substring(2),
        from: last.to,
        to: locations[3],
        date: new Date(last.date.getTime() + 86400000 * 3),
      },
    ]);
  };

  const removeSegment = (id: string) => {
    if (segments.length <= 2) return;

    setSegments(segments.filter((segment) => segment.id !== id));
  };

  const updateSegment = (
    index: number,
    field: keyof FlightSegment,
    value: any
  ) => {
    const copy = [...segments];
    copy[index] = {
      ...copy[index],
      [field]: value,
    };

    setSegments(copy);
  };

  const swapLocations = () => {
    const first = segments[0];

    updateSegment(0, "from", first.to);
    updateSegment(0, "to", first.from);
  };

  // ======================================================
  // PASSENGERS
  // ======================================================

  const totalPassengers =
    passengers.adults + passengers.children + passengers.infants;

  const changePassenger = (
    type: "adults" | "children" | "infants",
    amount: number
  ) => {
    setPassengers((prev) => ({
      ...prev,
      [type]: Math.max(type === "adults" ? 1 : 0, prev[type] + amount),
    }));
  };

  // ======================================================
  // SEARCH
  // ======================================================

  const handleSearch = () => {
    setSearched(true);

    setTimeout(() => {
      document
        .getElementById("flight-results")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#f6f8fc] text-slate-900 font-sans pb-20">

      {/* ==================================================
          HEADER
      ================================================== */}

      <nav className="bg-white/95 backdrop-blur-xl border-b border-slate-200/70 sticky top-0 z-[200]">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 h-[72px] flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
              <Plane
                size={21}
                fill="white"
                className="text-white"
              />
            </div>

            <div>
              <div className="text-[17px] font-black tracking-tight">
                TRIP<span className="text-blue-600">PRO</span>
              </div>

              <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-slate-400">
                Flight Management
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-500">
            <span className="text-blue-600">Flights</span>
            <span className="hover:text-blue-600 cursor-pointer">
              Bookings
            </span>
            <span className="hover:text-blue-600 cursor-pointer">
              Manage
            </span>
          </div>

          <Menu className="md:hidden text-slate-500" size={22} />
        </div>
      </nav>

      {/* ==================================================
          HERO
      ================================================== */}

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 pt-8">

        <div className="mb-5">
          <p className="text-blue-600 text-[11px] uppercase tracking-[0.22em] font-black mb-1">
            Smart Flight Search
          </p>

          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
            Find your perfect flight
          </h1>
        </div>

        {/* ==================================================
            SEARCH CARD
        ================================================== */}

        <div className="bg-white rounded-[24px] border border-slate-200/80 shadow-[0_15px_45px_-20px_rgba(15,23,42,0.20)] overflow-visible">

          {/* TRIP TYPE */}

          <div className="px-5 pt-5 flex items-center justify-between">

            <div className="inline-flex items-center bg-slate-100 rounded-xl p-1">
              {["One way", "Return", "Multi-city"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setTripType(tab)}
                  className={`
                    px-4 py-2 rounded-lg text-xs font-bold transition-all
                    ${
                      tripType === tab
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-2 text-[11px] font-bold text-slate-400">
              <SlidersHorizontal size={14} />
              Flexible search
            </div>
          </div>

          {/* SEARCH BODY */}

          <div className="p-5">

            {tripType === "Multi-city" ? (

              <div className="space-y-3">

                {segments.map((segment, index) => (

                  <motion.div
                    key={segment.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative flex flex-col lg:flex-row items-stretch gap-2"
                  >

                    <div className="flex-1 relative">
                      <SearchInput
                        label={`From ${index + 1}`}
                        value={segment.from}
                        icon={<PlaneTakeoff size={16} />}
                        onClick={() =>
                          setActiveSearch({
                            index,
                            type: "from",
                          })
                        }
                      />

                      {activeSearch?.index === index &&
                        activeSearch.type === "from" && (
                          <SearchDropdown
                            onSelect={(loc) => {
                              updateSegment(index, "from", loc);
                              setActiveSearch(null);
                            }}
                            onClose={() => setActiveSearch(null)}
                          />
                        )}
                    </div>

                    <div className="flex-1 relative">
                      <SearchInput
                        label="To"
                        value={segment.to}
                        icon={<PlaneLanding size={16} />}
                        onClick={() =>
                          setActiveSearch({
                            index,
                            type: "to",
                          })
                        }
                      />

                      {activeSearch?.index === index &&
                        activeSearch.type === "to" && (
                          <SearchDropdown
                            onSelect={(loc) => {
                              updateSegment(index, "to", loc);
                              setActiveSearch(null);
                            }}
                            onClose={() => setActiveSearch(null)}
                          />
                        )}
                    </div>

                    <div className="lg:w-[190px] relative">
                      <DateInput
                        label="Departure"
                        date={segment.date}
                        onClick={() => setActiveCalendar(index)}
                      />

                      {activeCalendar === index && (
                        <div className="absolute top-full left-0 z-[150] mt-2">
                          <SimpleCalendar
                            onSelect={(date) => {
                              updateSegment(index, "date", date);
                              setActiveCalendar(null);
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {segments.length > 2 && (
                      <button
                        onClick={() => removeSegment(segment.id)}
                        className="lg:w-10 flex items-center justify-center text-slate-400 hover:text-red-500 transition"
                      >
                        <Trash2 size={17} />
                      </button>
                    )}

                  </motion.div>

                ))}

                <button
                  onClick={addSegment}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 text-blue-600 text-xs font-black hover:bg-blue-100 transition"
                >
                  <Plus size={15} />
                  Add Another Flight
                </button>

              </div>

            ) : (

              <div className="flex flex-col xl:flex-row items-stretch gap-2">

                {/* FROM */}

                <div className="flex-1 min-w-0 relative">
                  <SearchInput
                    label="From"
                    value={segments[0].from}
                    icon={<PlaneTakeoff size={16} />}
                    onClick={() =>
                      setActiveSearch({
                        index: 0,
                        type: "from",
                      })
                    }
                  />

                  {activeSearch?.index === 0 &&
                    activeSearch.type === "from" && (
                      <SearchDropdown
                        onSelect={(loc) => {
                          updateSegment(0, "from", loc);
                          setActiveSearch(null);
                        }}
                        onClose={() => setActiveSearch(null)}
                      />
                    )}
                </div>

                {/* SWAP */}

                <div className="hidden xl:flex items-center justify-center -mx-1 z-10">
                  <button
                    onClick={swapLocations}
                    className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition"
                  >
                    <ArrowRightLeft size={15} />
                  </button>
                </div>

                {/* TO */}

                <div className="flex-1 min-w-0 relative">
                  <SearchInput
                    label="To"
                    value={segments[0].to}
                    icon={<PlaneLanding size={16} />}
                    onClick={() =>
                      setActiveSearch({
                        index: 0,
                        type: "to",
                      })
                    }
                  />

                  {activeSearch?.index === 0 &&
                    activeSearch.type === "to" && (
                      <SearchDropdown
                        onSelect={(loc) => {
                          updateSegment(0, "to", loc);
                          setActiveSearch(null);
                        }}
                        onClose={() => setActiveSearch(null)}
                      />
                    )}
                </div>

                {/* DEPARTURE */}

                <div className="w-full xl:w-[155px] relative">
                  <DateInput
                    label="Departure"
                    date={segments[0].date}
                    onClick={() => setActiveCalendar(0)}
                  />

                  {activeCalendar === 0 && (
                    <div className="absolute top-full left-0 z-[150] mt-2">
                      <SimpleCalendar
                        onSelect={(date) => {
                          updateSegment(0, "date", date);
                          setActiveCalendar(null);
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* RETURN */}

                <div
                  className={`
                    w-full xl:w-[155px] relative
                    ${
                      tripType === "One way"
                        ? "opacity-40 pointer-events-none"
                        : ""
                    }
                  `}
                >
                  <DateInput
                    label="Return"
                    date={returnDate}
                    onClick={() => setActiveCalendar("return")}
                  />

                  {activeCalendar === "return" && (
                    <div className="absolute top-full right-0 z-[150] mt-2">
                      <SimpleCalendar
                        onSelect={(date) => {
                          setReturnDate(date);
                          setActiveCalendar(null);
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* PASSENGERS */}

                <div className="w-full xl:w-[175px] relative">

                  <button
                    onClick={() =>
                      setShowPassengers(!showPassengers)
                    }
                    className="w-full h-full min-h-[64px] px-4 bg-slate-50 border border-slate-200 rounded-xl text-left hover:bg-white hover:border-blue-300 transition"
                  >

                    <p className="text-[9px] uppercase tracking-widest font-black text-slate-400">
                      Passengers
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <Users
                        size={16}
                        className="text-blue-600"
                      />

                      <span className="text-sm font-black text-slate-800">
                        {totalPassengers}{" "}
                        {totalPassengers === 1
                          ? "Passenger"
                          : "Passengers"}
                      </span>

                      <ChevronDown
                        size={14}
                        className="ml-auto text-slate-400"
                      />
                    </div>
                  </button>

                  <AnimatePresence>
                    {showPassengers && (
                      <PassengerDropdown
                        passengers={passengers}
                        changePassenger={changePassenger}
                        onClose={() =>
                          setShowPassengers(false)
                        }
                      />
                    )}
                  </AnimatePresence>

                </div>

                {/* SEARCH */}

                <button
                  onClick={handleSearch}
                  className="xl:w-[145px] min-h-[64px] px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
                >
                  <Search size={18} />
                  Search
                </button>

              </div>
            )}

            {/* BOTTOM INFO */}

            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-bold text-slate-400">

              <span className="flex items-center gap-1.5">
                <Check size={13} className="text-emerald-500" />
                Best available fares
              </span>

              <span className="flex items-center gap-1.5">
                <Check size={13} className="text-emerald-500" />
                No hidden charges
              </span>

              <span className="flex items-center gap-1.5">
                <Check size={13} className="text-emerald-500" />
                Secure booking
              </span>

            </div>

          </div>
        </div>
      </div>

      {/* ==================================================
          RESULTS
      ================================================== */}

      {searched && (
        <div
          id="flight-results"
          className="max-w-[1400px] mx-auto px-4 lg:px-8 mt-10"
        >

          {/* RESULT HEADER */}

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5">

            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-black text-blue-600 mb-1">
                Search Results
              </p>

              <h2 className="text-2xl font-black tracking-tight">
                Available Flights
              </h2>

              <p className="text-xs text-slate-400 font-medium mt-1">
                {segments[0].from.city} ({segments[0].from.code})
                <span className="mx-2">→</span>
                {segments[0].to.city} ({segments[0].to.code})
              </p>
            </div>

            <div className="flex items-center gap-2">

              <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 flex items-center gap-2 hover:border-blue-300">
                <SlidersHorizontal size={14} />
                Filters
              </button>

              <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600">
                Sort: Cheapest
              </button>

            </div>
          </div>

          {/* FLIGHTS */}

          <div className="space-y-3">

            {flights.map((flight, index) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                index={index}
              />
            ))}

          </div>
        </div>
      )}
    </div>
  );
}

// ======================================================
// SEARCH INPUT
// ======================================================

function SearchInput({
  label,
  value,
  icon,
  onClick,
}: {
  label: string;
  value: Location;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full min-h-[64px] px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-left hover:bg-white hover:border-blue-300 transition-all group"
    >
      <p className="text-[9px] uppercase tracking-[0.16em] font-black text-slate-400">
        {label}
      </p>

      <div className="flex items-center gap-2.5 mt-1">

        <div className="text-blue-600 shrink-0 group-hover:scale-110 transition">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-black text-slate-800 truncate">
            {value.city}
          </p>

          <p className="text-[10px] text-slate-400 font-semibold truncate">
            {value.code} · {value.country}
          </p>
        </div>
      </div>
    </button>
  );
}

// ======================================================
// DATE INPUT
// ======================================================

function DateInput({
  label,
  date,
  onClick,
}: {
  label: string;
  date: Date | null;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full min-h-[64px] px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-left hover:bg-white hover:border-blue-300 transition-all group"
    >
      <p className="text-[9px] uppercase tracking-[0.16em] font-black text-slate-400">
        {label}
      </p>

      <div className="flex items-center gap-2.5 mt-1">

        <CalIcon
          size={16}
          className="text-blue-600 shrink-0 group-hover:scale-110 transition"
        />

        <p className="text-sm font-black text-slate-800">
          {date
            ? date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              })
            : "Select"}
        </p>
      </div>
    </button>
  );
}

// ======================================================
// LOCATION DROPDOWN
// ======================================================

function SearchDropdown({
  onSelect,
  onClose,
}: {
  onSelect: (loc: Location) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");

  const filtered = locations.filter(
    (loc) =>
      loc.city.toLowerCase().includes(query.toLowerCase()) ||
      loc.code.toLowerCase().includes(query.toLowerCase()) ||
      loc.country.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-full left-0 mt-2 w-full min-w-[300px] bg-white rounded-2xl border border-slate-200 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.25)] z-[300] overflow-hidden"
    >

      <div className="p-3 border-b border-slate-100 flex items-center gap-2">

        <Search size={15} className="text-slate-400" />

        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="City or airport..."
          className="flex-1 outline-none text-xs font-bold text-slate-700"
        />

        <button onClick={onClose}>
          <X size={17} className="text-slate-400 hover:text-slate-700" />
        </button>

      </div>

      <div className="max-h-[280px] overflow-y-auto">

        {filtered.map((loc) => (
          <button
            key={loc.code}
            onClick={() => onSelect(loc)}
            className="w-full p-3.5 flex items-center gap-3 hover:bg-blue-50 text-left transition"
          >

            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
              <MapPin size={16} />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-black text-slate-800">
                {loc.city}
              </p>

              <p className="text-[10px] text-slate-400">
                {loc.country}
              </p>
            </div>

            <span className="text-xs font-black text-blue-600">
              {loc.code}
            </span>

          </button>
        ))}

        {filtered.length === 0 && (
          <div className="p-8 text-center text-xs font-bold text-slate-400">
            No airport found
          </div>
        )}

      </div>
    </motion.div>
  );
}

// ======================================================
// PASSENGER DROPDOWN
// ======================================================

function PassengerDropdown({
  passengers,
  changePassenger,
  onClose,
}: {
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  changePassenger: (
    type: "adults" | "children" | "infants",
    amount: number
  ) => void;
  onClose: () => void;
}) {
  const rows = [
    {
      key: "adults" as const,
      title: "Adults",
      sub: "12+ years",
    },
    {
      key: "children" as const,
      title: "Children",
      sub: "2–11 years",
    },
    {
      key: "infants" as const,
      title: "Infants",
      sub: "Under 2 years",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="absolute top-full right-0 mt-2 w-[290px] bg-white rounded-2xl border border-slate-200 shadow-2xl z-[300] p-4"
    >

      {rows.map((row) => (
        <div
          key={row.key}
          className="flex items-center justify-between py-3 border-b last:border-0 border-slate-100"
        >

          <div>
            <p className="text-xs font-black text-slate-800">
              {row.title}
            </p>

            <p className="text-[9px] text-slate-400 font-semibold">
              {row.sub}
            </p>
          </div>

          <div className="flex items-center gap-3">

            <button
              onClick={() => changePassenger(row.key, -1)}
              className="w-7 h-7 rounded-lg border border-slate-200 text-slate-500 font-black hover:bg-slate-50"
            >
              −
            </button>

            <span className="w-4 text-center text-xs font-black">
              {passengers[row.key]}
            </span>

            <button
              onClick={() => changePassenger(row.key, 1)}
              className="w-7 h-7 rounded-lg bg-blue-600 text-white font-black hover:bg-blue-700"
            >
              +
            </button>

          </div>

        </div>
      ))}

      <button
        onClick={onClose}
        className="w-full mt-3 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-black"
      >
        Done
      </button>

    </motion.div>
  );
}

// ======================================================
// FLIGHT CARD
// ======================================================

function FlightCard({
  flight,
  index,
}: {
  flight: Flight;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className={`
        relative bg-white rounded-2xl border overflow-hidden
        shadow-[0_8px_30px_-20px_rgba(15,23,42,0.25)]
        hover:shadow-[0_15px_40px_-20px_rgba(15,23,42,0.30)]
        transition-all
        ${
          flight.featured
            ? "border-blue-200"
            : "border-slate-200/80"
        }
      `}
    >

      {flight.featured && (
        <div className="absolute top-0 left-0 px-3 py-1.5 bg-blue-600 text-white text-[8px] uppercase tracking-widest font-black rounded-br-xl">
          Recommended
        </div>
      )}

      <div className="p-4 lg:p-5">

        <div className="flex flex-col lg:flex-row lg:items-center gap-5">

          {/* AIRLINE */}

          <div className="lg:w-[190px] flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xs">
              {flight.logo}
            </div>

            <div>
              <p className="text-xs font-black text-slate-800">
                {flight.airline}
              </p>

              <p className="text-[10px] text-slate-400 font-semibold">
                {flight.flightNo}
              </p>
            </div>

          </div>

          {/* ROUTE */}

          <div className="flex-1 flex items-center justify-center gap-5">

            <div className="text-right min-w-[70px]">
              <p className="text-xl font-black text-slate-900">
                {flight.departure}
              </p>

              <p className="text-[10px] font-black text-slate-400">
                {flight.fromCode}
              </p>
            </div>

            <div className="w-[120px]">

              <div className="flex items-center gap-2">
                <div className="h-px bg-slate-200 flex-1" />

                <Plane
                  size={14}
                  className="text-blue-600 rotate-90"
                />

                <div className="h-px bg-slate-200 flex-1" />
              </div>

              <p className="text-[9px] text-center font-bold text-slate-400 mt-1">
                {flight.duration}
              </p>

            </div>

            <div className="min-w-[70px]">
              <p className="text-xl font-black text-slate-900">
                {flight.arrival}
              </p>

              <p className="text-[10px] font-black text-slate-400">
                {flight.toCode}
              </p>
            </div>

          </div>

          {/* DETAILS */}

          <div className="lg:w-[160px] border-l border-slate-100 lg:pl-5 flex lg:block justify-between">

            <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600">
              <Clock3 size={12} />
              {flight.stops}
            </div>

            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 mt-1">
              <Luggage size={12} />
              {flight.baggage}
            </div>

          </div>

          {/* PRICE */}

          <div className="lg:w-[170px] lg:border-l lg:border-slate-100 lg:pl-5 flex lg:block items-center justify-between">

            <div>
              <p className="text-[9px] uppercase tracking-widest font-black text-slate-400">
                From
              </p>

              <p className="text-xl font-black text-slate-900">
                PKR {flight.price.toLocaleString()}
              </p>

              <p className="text-[9px] text-slate-400 font-semibold">
                per adult
              </p>
            </div>

            <button className="lg:mt-3 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black transition shadow-md shadow-blue-100">
              Select
            </button>

          </div>

        </div>

        {/* CARD FOOTER */}

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">

          <div className="flex items-center gap-2 text-[9px] text-slate-400 font-semibold">
            <Star size={11} className="text-amber-400" />
            Recommended fare
            <span>•</span>
            Free date change
          </div>

          <button className="text-[9px] font-black text-blue-600 hover:text-blue-700">
            Flight details →
          </button>

        </div>

      </div>
    </motion.div>
  );
}

// ======================================================
// CALENDAR
// ======================================================

function SimpleCalendar({
  onSelect,
}: {
  onSelect: (date: Date) => void;
}) {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="bg-white p-4 shadow-2xl rounded-2xl border border-slate-200 w-[280px]">

      <div className="flex items-center justify-between mb-4">

        <button className="text-slate-400 hover:text-blue-600">
          ‹
        </button>

        <h3 className="text-sm font-black">
          September 2026
        </h3>

        <button className="text-slate-400 hover:text-blue-600">
          ›
        </button>

      </div>

      <div className="grid grid-cols-7 gap-1">

        {["S", "M", "T", "W", "T", "F", "S"].map(
          (day, index) => (
            <div
              key={index}
              className="text-center text-[9px] font-black text-slate-400 py-2"
            >
              {day}
            </div>
          )
        )}

        {days.map((day) => (
          <button
            key={day}
            onClick={() =>
              onSelect(new Date(2026, 8, day))
            }
            className="text-center py-2 text-[11px] font-bold rounded-lg hover:bg-blue-600 hover:text-white transition"
          >
            {day}
          </button>
        ))}

      </div>
    </div>
  );
}