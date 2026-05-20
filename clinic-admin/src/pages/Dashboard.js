import React, { useEffect, useState } from "react";
import AppointmentCalendar from "../components/AppointmentCalendar";

import {
    getAppointments,
    updateAppointmentApi,
    deleteAppointmentApi
} from "../api";

export default function Dashboard() {

    // ===============================
    // STATE
    // ===============================
    const [appointments, setAppointments] = useState([]);
    const [viewMode, setViewMode] = useState("table");
    const [search, setSearch] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedId, setSelectedId] = useState(null);

    const [editData, setEditData] = useState({
        id: null,
        name: "",
        email: "",
        phone: "",
        appointment_date: "",
        time_slot: "",
        reason: ""
    });

    // ===============================
    // AUTH + LOAD DATA
    // ===============================
    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = "/login";
        }

        loadData();

    }, []);

    // ===============================
    // LOAD DATA
    // ===============================
    const loadData = async () => {

        setLoading(true);

        try {
            const data = await getAppointments();
            setAppointments(data);
        } catch (err) {
            console.log(err);
            alert("Error loading appointments");
        } finally {
            setLoading(false);
        }
    };

    // ===============================
    // FILTER (SEARCH + DATE)
    // ===============================
    const filteredAppointments = appointments.filter(app => {

        const matchesSearch =
            app.name.toLowerCase().includes(search.toLowerCase()) ||
            app.email.toLowerCase().includes(search.toLowerCase()) ||
            app.phone.toLowerCase().includes(search.toLowerCase()) ||
            app.reason.toLowerCase().includes(search.toLowerCase());

        const matchesDate =
            selectedDate === "" || app.appointment_date === selectedDate;

        return matchesSearch && matchesDate;
    });

    // ===============================
    // EDIT
    // ===============================
    const openEditModal = (app) => {
        setEditData(app);
        setShowModal(true);
    };

    const handleChange = (e) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value
        });
    };

    const updateAppointment = async () => {

        try {
            const data = await updateAppointmentApi(editData.id, editData);

            alert(data.message || "Updated successfully");
            setShowModal(false);
            loadData();

        } catch (err) {
            console.log(err);
            alert("Update failed");
        }
    };

    // ===============================
    // DELETE
    // ===============================
    const openDeleteModal = (id) => {
        setSelectedId(id);
        setShowDeleteModal(true);
    };

    const deleteAppointment = async () => {

        try {
            const data = await deleteAppointmentApi(selectedId);

            alert(data.message || "Deleted successfully");
            setShowDeleteModal(false);
            loadData();

        } catch (err) {
            console.log(err);
            alert("Delete failed");
        }
    };

    // ===============================
    // LOGOUT
    // ===============================
    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    // ===============================
    // UI
    // ===============================
    return (
        <div className="min-h-screen bg-gray-100 p-8">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">

                <div>
                    <h1 className="text-4xl font-bold text-gray-800">
                        Medicare Admin Portal
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Manage appointments professionally
                    </p>
                </div>

                <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
                >
                    Logout
                </button>

            </div>

            {/* SEARCH + FILTER */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">

                <input
                    type="text"
                    placeholder="Search appointments..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-96 px-4 py-3 border rounded-xl"
                />

                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full md:w-64 px-4 py-3 border rounded-xl"
                />

                <button
                    onClick={() => setSelectedDate("")}
                    className="bg-gray-200 px-4 py-2 rounded-xl"
                >
                    Clear
                </button>

            </div>

            {/* VIEW SWITCH */}
            <div className="flex gap-3 mb-6">

                <button
                    onClick={() => setViewMode("table")}
                    className={`px-4 py-2 rounded-xl ${
                        viewMode === "table"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200"
                    }`}
                >
                    Table View
                </button>

                <button
                    onClick={() => setViewMode("calendar")}
                    className={`px-4 py-2 rounded-xl ${
                        viewMode === "calendar"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200"
                    }`}
                >
                    Calendar View
                </button>

            </div>

            {/* LOADING */}
            {loading && (
                <div className="bg-white p-6 rounded-xl mb-6">
                    Loading appointments...
                </div>
            )}

            {/* MAIN CONTENT */}
            {viewMode === "table" ? (

                // ================= TABLE VIEW =================
                <div className="bg-white rounded-2xl shadow overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="p-4 text-left">Name</th>
                                <th className="p-4 text-left">Email</th>
                                <th className="p-4 text-left">Phone</th>
                                <th className="p-4 text-left">Date</th>
                                <th className="p-4 text-left">Time</th>
                                <th className="p-4 text-left">Reason</th>
                                <th className="p-4 text-left">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredAppointments.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center p-10 text-gray-500">
                                        No appointments found
                                    </td>
                                </tr>
                            ) : (
                                filteredAppointments.map(app => (
                                    <tr key={app.id} className="border-b hover:bg-gray-50">

                                        <td className="p-4">{app.name}</td>
                                        <td className="p-4">{app.email}</td>
                                        <td className="p-4">{app.phone}</td>
                                        <td className="p-4">{app.appointment_date}</td>
                                        <td className="p-4">{app.time_slot}</td>
                                        <td className="p-4">{app.reason}</td>

                                        <td className="p-4">

                                            <button
                                                onClick={() => openEditModal(app)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => openDeleteModal(app.id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded"
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>

                </div>

            ) : (

                // ================= CALENDAR VIEW =================
                <AppointmentCalendar
                    appointments={filteredAppointments}
                    onSelectEvent={(app) => openEditModal(app)}
                />

            )}

            {/* ================= EDIT MODAL ================= */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

                    <div className="bg-white p-6 rounded-xl w-full max-w-md">

                        <h2 className="text-xl font-bold mb-4">
                            Edit Appointment
                        </h2>

                        <input
                            name="name"
                            value={editData.name}
                            onChange={handleChange}
                            className="w-full border p-2 mb-2"
                        />

                        <input
                            name="email"
                            value={editData.email}
                            onChange={handleChange}
                            className="w-full border p-2 mb-2"
                        />

                        <input
                            name="phone"
                            value={editData.phone}
                            onChange={handleChange}
                            className="w-full border p-2 mb-2"
                        />

                        <input
                            type="date"
                            name="appointment_date"
                            value={editData.appointment_date}
                            onChange={handleChange}
                            className="w-full border p-2 mb-2"
                        />

                        <input
                            name="time_slot"
                            value={editData.time_slot}
                            onChange={handleChange}
                            className="w-full border p-2 mb-2"
                        />

                        <input
                            name="reason"
                            value={editData.reason}
                            onChange={handleChange}
                            className="w-full border p-2 mb-2"
                        />

                        <button
                            onClick={updateAppointment}
                            className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
                        >
                            Save
                        </button>

                        <button
                            onClick={() => setShowModal(false)}
                            className="bg-gray-300 px-4 py-2 rounded"
                        >
                            Cancel
                        </button>

                    </div>

                </div>
            )}

            {/* ================= DELETE MODAL ================= */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

                    <div className="bg-white p-6 rounded-xl text-center">

                        <h2 className="text-xl font-bold mb-4">
                            Delete Appointment?
                        </h2>

                        <button
                            onClick={deleteAppointment}
                            className="bg-red-600 text-white px-4 py-2 rounded mr-2"
                        >
                            Yes Delete
                        </button>

                        <button
                            onClick={() => setShowDeleteModal(false)}
                            className="bg-gray-300 px-4 py-2 rounded"
                        >
                            Cancel
                        </button>

                    </div>

                </div>
            )}

        </div>
    );
}