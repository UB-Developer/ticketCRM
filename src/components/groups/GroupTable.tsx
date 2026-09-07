"use client";

import Link from "next/link";
import {
    ArrowRight,
    CalendarDays,
    PlaneTakeoff,
    Users,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { UmrahGroup } from "@/types/umrah-group";

interface Props {
    groups: UmrahGroup[];
}

/* =========================================================
   HELPERS
========================================================= */

const getFlightLogo = (logo?: string) => {
    if (!logo) return null;

    if (logo.startsWith("http")) {
        return logo;
    }

    return `https://noorulharmain.com.pk/storage/${logo.replace(
        /^\/?storage\//,
        ""
    )}`;
};

const getFlightType = (flight: any) => {
    return (flight?.pivot?.type || flight?.type || "").toLowerCase();
};

const formatTime = (time?: string) => {
    if (!time) return "--";

    return time.substring(0, 5);
};

const formatDate = (date?: string) => {
    if (!date) return "--";

    const d = new Date(date);

    if (isNaN(d.getTime())) {
        return date;
    }

    return d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

/* =========================================================
   GROUP VIEW URL
========================================================= */

const getGroupViewUrl = (pnr: string) => {
    return `/dashboard/groups/${encodeURIComponent(pnr)}`;
};


/* =========================================================
   COMPONENT
========================================================= */

export default function GroupTable({ groups }: Props) {
    return (
        <div className="w-full space-y-4">

            {groups.map((group) => {

                const goingFlights =
                    group.flights?.filter(
                        (flight) => getFlightType(flight) === "going"
                    ) || [];

                const returnFlights =
                    group.flights?.filter(
                        (flight) => getFlightType(flight) === "return"
                    ) || [];

                const allFlights = [
                    ...goingFlights,
                    ...returnFlights,
                ];

                return (
                    <div
                        key={group.id}
                        className="
                            group
                            w-full
                            overflow-hidden
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            shadow-sm
                            transition-all
                            hover:border-cyan-200
                            hover:shadow-lg
                            dark:border-white/10
                            dark:bg-slate-900
                        "
                    >

                        {/* =================================================
                            MAIN ROW
                        ================================================= */}

                        <div
                            className="
                                grid
                                grid-cols-[170px_minmax(0,1fr)_105px_125px_145px_105px]
                                items-stretch
                            "
                        >

                            {/* =================================================
                                GROUP INFO
                            ================================================= */}

                            <div
                                className="
                                    flex
                                    flex-col
                                    justify-center
                                    border-r
                                    border-slate-100
                                    bg-slate-50/70
                                    px-5
                                    py-5
                                    dark:border-white/10
                                    dark:bg-white/[0.02]
                                "
                            >

                                <div className="text-[15px] font-black leading-tight text-slate-900 dark:text-white">
                                    {group.name}
                                </div>

                                <div className="mt-1 text-[10px] font-black uppercase tracking-wider text-cyan-600">
                                    {group.group_no}
                                </div>

                                <div
                                    className="
                                        mt-3
                                        w-fit
                                        rounded-lg
                                        bg-slate-100
                                        px-2.5
                                        py-1.5
                                        text-[10px]
                                        font-black
                                        text-slate-600
                                        dark:bg-white/10
                                        dark:text-slate-300
                                    "
                                >
                                    PNR: {group.pnr_number}
                                </div>

                            </div>


                            {/* =================================================
                                FLIGHTS
                            ================================================= */}

                            <div className="min-w-0 px-4 py-3">

                                {allFlights.length === 0 ? (

                                    <div className="flex h-full items-center text-xs font-bold text-slate-400">
                                        No flight assigned
                                    </div>

                                ) : (

                                    <div className="space-y-2">

                                        {allFlights.map((flight, index) => {

                                            const logo = getFlightLogo(
                                                flight.logo
                                            );

                                            const type =
                                                getFlightType(flight);

                                            const isGoing =
                                                type === "going";

                                            return (
                                                <div
                                                    key={`${flight.id}-${index}`}
                                                    className="
                                                        flex
                                                        min-w-0
                                                        items-center
                                                        gap-3
                                                        rounded-xl
                                                        border
                                                        border-slate-100
                                                        bg-slate-50/70
                                                        px-3
                                                        py-2.5
                                                        dark:border-white/10
                                                        dark:bg-white/[0.025]
                                                    "
                                                >

                                                    {/* LOGO */}

                                                    <div
                                                        className="
                                                            flex
                                                            h-11
                                                            w-14
                                                            shrink-0
                                                            items-center
                                                            justify-center
                                                            rounded-lg
                                                            border
                                                            border-slate-100
                                                            bg-white
                                                            p-1.5
                                                            dark:border-white/10
                                                            dark:bg-white/10
                                                        "
                                                    >
                                                        {logo ? (
                                                            <img
                                                                src={logo}
                                                                alt={
                                                                    flight.name ||
                                                                    "Flight"
                                                                }
                                                                className="
                                                                    max-h-8
                                                                    max-w-[50px]
                                                                    object-contain
                                                                "
                                                            />
                                                        ) : (
                                                            <PlaneTakeoff
                                                                className="
                                                                    h-5
                                                                    w-5
                                                                    text-slate-400
                                                                "
                                                            />
                                                        )}
                                                    </div>


                                                    {/* AIRLINE */}

                                                    <div className="w-[125px] shrink-0">

                                                        <div
                                                            className="
                                                                truncate
                                                                text-[11px]
                                                                font-black
                                                                uppercase
                                                                text-slate-800
                                                                dark:text-white
                                                            "
                                                        >
                                                            {flight.name}
                                                        </div>

                                                        <div className="mt-1 flex items-center gap-1.5">

                                                            <span
                                                                className="
                                                                    rounded
                                                                    bg-slate-200
                                                                    px-1.5
                                                                    py-0.5
                                                                    text-[9px]
                                                                    font-black
                                                                    text-slate-600
                                                                    dark:bg-white/10
                                                                    dark:text-slate-300
                                                                "
                                                            >
                                                                {flight.flight_number}
                                                            </span>

                                                            <span
                                                                className={`
                                                                    rounded
                                                                    px-1.5
                                                                    py-0.5
                                                                    text-[8px]
                                                                    font-black
                                                                    uppercase
                                                                    ${isGoing
                                                                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                                                                        : "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400"
                                                                    }
                                                                `}
                                                            >
                                                                {isGoing
                                                                    ? "Going"
                                                                    : "Return"}
                                                            </span>

                                                        </div>

                                                    </div>


                                                    {/* ROUTE */}

                                                    <div className="min-w-[115px] flex-1">

                                                        <div className="flex items-center gap-2 whitespace-nowrap">

                                                            <span className="text-[12px] font-black text-slate-900 dark:text-white">
                                                                {flight.from_place}
                                                            </span>

                                                            <span className="text-cyan-500">
                                                                →
                                                            </span>

                                                            <span className="text-[12px] font-black text-slate-900 dark:text-white">
                                                                {flight.to_place}
                                                            </span>

                                                        </div>

                                                        <div className="mt-0.5 text-[8px] font-bold uppercase text-slate-400">
                                                            {flight.class_type ||
                                                                "Economy"}
                                                        </div>

                                                    </div>


                                                    {/* TIME */}

                                                    <div className="w-[105px] shrink-0">

                                                        <div className="flex items-center gap-1.5 whitespace-nowrap text-[12px] font-black text-slate-800 dark:text-white">

                                                            <span>
                                                                {formatTime(
                                                                    flight.departure_time
                                                                )}
                                                            </span>

                                                            <span className="text-slate-300">
                                                                —
                                                            </span>

                                                            <span>
                                                                {formatTime(
                                                                    flight.arrival_time
                                                                )}
                                                            </span>

                                                        </div>

                                                        <div className="mt-0.5 text-[8px] font-bold text-slate-400">
                                                            Departure / Arrival
                                                        </div>

                                                    </div>


                                                    {/* FLIGHT SEATS */}

                                                    


                                                    {/* FLIGHT PNR */}

                                                </div>
                                            );
                                        })}

                                    </div>

                                )}

                            </div>


                            {/* =================================================
                                GROUP SEATS
                            ================================================= */}

                            <div
                                className="
                                    flex
                                    flex-col
                                    justify-center
                                    border-l
                                    border-slate-100
                                    px-4
                                    py-4
                                    dark:border-white/10
                                "
                            >

                                <div className="text-[17px] font-black text-emerald-600">
                                    {group.available_seats}
                                </div>

                                <div className="text-[9px] font-bold uppercase text-slate-400">
                                    Available
                                </div>

                                <div className="mt-1 text-[9px] font-bold text-slate-400">
                                    / {group.total_seats} Total
                                </div>

                            </div>


                            {/* =================================================
                                DATE
                            ================================================= */}

                            <div
                                className="
                                    flex
                                    flex-col
                                    justify-center
                                    border-l
                                    border-slate-100
                                    px-4
                                    py-4
                                    dark:border-white/10
                                "
                            >

                                <div className="flex items-start gap-2">

                                    <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-cyan-500" />

                                    <div>

                                        <div className="text-[11px] font-black leading-tight text-slate-800 dark:text-white">
                                            {formatDate(
                                                group.departure_date
                                            )}
                                        </div>

                                        <div className="mt-1 text-[9px] font-bold uppercase text-slate-400">
                                            {group.days} Days
                                        </div>

                                        {group.nights > 0 && (
                                            <div className="text-[9px] font-bold uppercase text-slate-400">
                                                {group.nights} Nights
                                            </div>
                                        )}

                                    </div>

                                </div>

                            </div>


                            {/* =================================================
                                PRICE
                            ================================================= */}

                            <div
                                className="
                                    flex
                                    flex-col
                                    justify-center
                                    border-l
                                    border-slate-100
                                    px-4
                                    py-4
                                    dark:border-white/10
                                "
                            >

                                <div className="text-[15px] font-black whitespace-nowrap text-slate-900 dark:text-white">
                                    Rs {formatPrice(group.price)}
                                </div>

                                <div className="mt-1 text-[8px] font-black uppercase tracking-wide text-slate-400">
                                    Per Person
                                </div>

                            </div>


                            {/* =================================================
                                VIEW BUTTON
                            ================================================= */}

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    border-l
                                    border-slate-100
                                    px-3
                                    dark:border-white/10
                                "
                            >

                                <Link
                                    href={getGroupViewUrl(
                                        group.pnr_number
                                    )}
                                    className="
                                        inline-flex
                                        items-center
                                        gap-1.5
                                        rounded-xl
                                        bg-cyan-500
                                        px-3
                                        py-2.5
                                        text-[10px]
                                        font-black
                                        text-white
                                        shadow-sm
                                        transition-all
                                        hover:bg-cyan-600
                                        hover:shadow-md
                                    "
                                >
                                    View

                                    <ArrowRight className="h-3.5 w-3.5" />
                                </Link>

                            </div>

                        </div>

                    </div>
                );
            })}

        </div>
    );
}