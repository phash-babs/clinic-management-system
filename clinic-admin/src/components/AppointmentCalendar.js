import React, { useMemo, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function AppointmentCalendar({
    appointments,
    onSelectEvent
}) {

    const [view, setView] = useState("month");

    // Convert API data → calendar events
    const events = useMemo(() => {
        return appointments.map(app => {

            const start = new Date(`${app.appointment_date}T${app.time_slot || "09:00"}`);

            const end = new Date(start.getTime() + 30 * 60000); // 30 min slot

            return {
                id: app.id,
                title: `${app.name} (${app.reason})`,
                start,
                end,
                data: app
            };
        });
    }, [appointments]);

    // 🎨 Color coding logic
    const eventStyleGetter = (event) => {

        let backgroundColor = "#3b82f6"; // default blue

        const reason = (event.data.reason || "").toLowerCase();

        if (reason.includes("emergency")) backgroundColor = "#ef4444";
        else if (reason.includes("check")) backgroundColor = "#22c55e";
        else if (reason.includes("follow")) backgroundColor = "#f59e0b";

        return {
            style: {
                backgroundColor,
                borderRadius: "8px",
                color: "white",
                border: "none",
                padding: "4px"
            }
        };
    };

    return (
        <div className="bg-white p-4 rounded-2xl shadow-lg">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">

                <h2 className="text-xl font-bold">
                    Appointment Calendar
                </h2>

                {/* VIEW SWITCH */}
                <div className="flex gap-2">

                    {["month", "week", "day", "agenda"].map(v => (
                        <button
                            key={v}
                            onClick={() => setView(v)}
                            className={`px-3 py-1 rounded-lg text-sm ${
                                view === v
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200"
                            }`}
                        >
                            {v}
                        </button>
                    ))}

                </div>

            </div>

            {/* CALENDAR */}
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                view={view}
                onView={setView}
                style={{ height: 650 }}
                eventPropGetter={eventStyleGetter}
                onSelectEvent={(event) => {
                    if (onSelectEvent) {
                        onSelectEvent(event.data);
                    }
                }}
            />

        </div>
    );
}