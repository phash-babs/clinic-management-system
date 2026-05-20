import React, { useEffect, useState } from "react";
import AppointmentCalendar from "../components/AppointmentCalendar";
import { getAppointments, updateAppointmentApi, deleteAppointmentApi } from "../api";

export default function Dashboard() {

    // ================= STATE =================
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

    // ================= USE EFFECT (INSIDE COMPONENT ONLY) =================
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = "/login";
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

    return (
        <div>
            <h1>Dashboard Working</h1>
        </div>
    );
}