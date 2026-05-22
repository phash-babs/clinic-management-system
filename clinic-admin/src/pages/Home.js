import ClinicBrand from "../components/ClinicBrand";
import React, { useState } from "react";

export default function Home() {

    const API = process.env.REACT_APP_API;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        reason: "",
        appointment_date: "",
        time_slot: ""
    });

    // =========================
    // HANDLE INPUT
    // =========================
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    // =========================
    // SUBMIT
    // =========================
    const submitAppointment = async (e) => {

        // VERY IMPORTANT
        e.preventDefault();

        try {

            const res = await fetch(`${API}/appointments/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {

                alert("Appointment booked successfully!");

                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    reason: "",
                    appointment_date: "",
                    time_slot: ""
                });

            } else {

                alert(data.detail || "Booking failed");

            }

        } catch (err) {

            console.log(err);

            alert("Server error");

        }
    };

    return (

        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">

    <ClinicBrand />

    <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Book Appointment
    </h1>

                <form
                    onSubmit={submitAppointment}
                    className="space-y-4"
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-xl"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-xl"
                        required
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-xl"
                        required
                    />

                    <input
                        type="date"
                        name="appointment_date"
                        value={formData.appointment_date}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-xl"
                        required
                    />

                    <select
                        name="time_slot"
                        value={formData.time_slot}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-xl"
                        required
                    >
                        <option value="">Select Time Slot</option>
                        <option>09:00 AM</option>
                        <option>10:00 AM</option>
                        <option>11:00 AM</option>
                        <option>12:00 PM</option>
                        <option>01:00 PM</option>
                        <option>02:00 PM</option>
                        <option>03:00 PM</option>
                    </select>

                    <textarea
                        name="reason"
                        placeholder="Reason for Appointment"
                        value={formData.reason}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-xl"
                        rows="4"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
                    >
                        Book Appointment
                    </button>

                </form>

            </div>

        </div>
    );
}