const API = process.env.REACT_APP_API;

// ===============================
// GET TOKEN
// ===============================
export const getToken = () => {
    return localStorage.getItem("token");
};

// ===============================
// HANDLE AUTH ERROR
// ===============================
const handleUnauthorized = (res) => {

    if (res.status === 401) {

        localStorage.removeItem("token");

        window.location.href = "/login";

        throw new Error("Unauthorized");
    }
};

// ===============================
// GET APPOINTMENTS
// ===============================
export const getAppointments = async () => {

    const res = await fetch(`${API}/admin/appointments/`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    handleUnauthorized(res);

    if (!res.ok) {
        throw new Error("Failed to fetch appointments");
    }

    return await res.json();
};

// ===============================
// UPDATE APPOINTMENT
// ===============================
export const updateAppointmentApi = async (id, data) => {

    const res = await fetch(
        `${API}/admin/appointments/${id}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`
            },

            body: JSON.stringify(data)
        }
    );

    handleUnauthorized(res);

    if (!res.ok) {
        throw new Error("Failed to update appointment");
    }

    return await res.json();
};

// ===============================
// DELETE APPOINTMENT
// ===============================
export const deleteAppointmentApi = async (id) => {

    const res = await fetch(
        `${API}/admin/appointments/${id}`,
        {
            method: "DELETE",

            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    handleUnauthorized(res);

    if (!res.ok) {
        throw new Error("Failed to delete appointment");
    }

    return await res.json();
};