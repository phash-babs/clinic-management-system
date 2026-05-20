import React, { useEffect, useState } from "react";
import AppointmentCalendar from "../components/AppointmentCalendar";
import {
    getAppointments,
    updateAppointmentApi,
    deleteAppointmentApi
} from "../api";

export default function Dashboard() {

    // ================= STATE =================
    const [appointments, setAppointments] = useState([]);
    const [viewMode, setViewMode] = useState("table");

    const [search, setSearch] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [loading, setLoading] = useState(false);

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

    // ================= AUTH =================
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = "/login";
            return;
        }

        loadData();
    }, []);

    // ================= LOAD DATA =================
    const loadData = async () => {
        try {
            setLoading(true);
            const data = await getAppointments();
            setAppointments(data);
        } catch (err) {
            console.log(err);
            alert("Error loading appointments");
        } finally {
            setLoading(false);
        }
    };

    // ================= FILTER =================
    const filteredAppointments = appointments.filter((app) => {
        const matchesSearch =
            app.name?.toLowerCase().includes(search.toLowerCase()) ||
            app.email?.toLowerCase().includes(search.toLowerCase()) ||
            app.phone?.toLowerCase().includes(search.toLowerCase()) ||
            app.reason?.toLowerCase().includes(search.toLowerCase());

        const matchesDate =
            selectedDate === "" || app.appointment_date === selectedDate;

        return matchesSearch && matchesDate;
    });

    // ================= EDIT =================
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
            await updateAppointmentApi(editData.id, editData);
            alert("Appointment updated successfully");
            setShowModal(false);
            loadData();
        } catch (err) {
            console.log(err);
            alert("Update failed");
        }
    };

    // ================= DELETE =================
    const openDeleteModal = (id) => {
        setSelectedId(id);
        setShowDeleteModal(true);
    };

    const deleteAppointment = async () => {
        try {
            await deleteAppointmentApi(selectedId);
            alert("Appointment deleted successfully");
            setShowDeleteModal(false);
            loadData();
        } catch (err) {
            console.log(err);
            alert("Delete failed");
        }
    };

    // ================= LOGOUT =================
    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    // ================= UI =================
    return (
        <div className="min-h-screen bg-gray-100 p-8">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Clinic Admin Dashboard</h1>

                <button
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>

            {/* SEARCH */}
            <div className="flex gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 rounded w-1/2"
                />

                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border p-2 rounded"
                />

                <button
                    onClick={() => setSelectedDate("")}
                    className="bg-gray-300 px-3 rounded"
                >
                    Clear
                </button>
            </div>

            {/* VIEW SWITCH */}
            <div className="mb-4">
                <button
                    onClick={() => setViewMode("table")}
                    className={`px-3 py-1 mr-2 rounded ${
                        viewMode === "table"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200"
                    }`}
                >
                    Table
                </button>

                <button
                    onClick={() => setViewMode("calendar")}
                    className={`px-3 py-1 rounded ${
                        viewMode === "calendar"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200"
                    }`}
                >
                    Calendar
                </button>
            </div>

            {/* LOADING */}
            {loading && (
                <div className="bg-white p-4 mb-4">
                    Loading appointments...
                </div>
            )}

            {/* MAIN VIEW */}
            {viewMode === "table" ? (

                <div className="bg-white rounded shadow overflow-x-auto">

                    <table className="w-full">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Phone</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Time</th>
                                <th className="p-3">Reason</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredAppointments.map((app) => (
                                <tr key={app.id} className="border-b">

                                    <td className="p-3">{app.name}</td>
                                    <td className="p-3">{app.email}</td>
                                    <td className="p-3">{app.phone}</td>
                                    <td className="p-3">{app.appointment_date}</td>
                                    <td className="p-3">{app.time_slot}</td>
                                    <td className="p-3">{app.reason}</td>

                                    <td className="p-3">
                                        <button
                                            onClick={() => openEditModal(app)}
                                            className="bg-blue-500 text-white px-2 py-1 mr-2"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => openDeleteModal(app.id)}
                                            className="bg-red-500 text-white px-2 py-1"
                                        >
                                            Delete
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

            ) : (

                <AppointmentCalendar appointments={filteredAppointments} />

            )}

            {/* ================= EDIT MODAL ================= */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

                    <div className="bg-white p-6 rounded-xl w-full max-w-md">

                        <h2 className="text-xl font-bold mb-4">Edit Appointment</h2>

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

                        <h2 className="text-xl font-bold mb-4">Delete Appointment?</h2>

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