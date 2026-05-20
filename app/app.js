const API = "https://clinic-api-nfli.onrender.com";

// BOOK APPOINTMENT (PUBLIC)
export const bookAppointment = async (data) => {
    const res = await fetch(`${API}/appointments/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return await res.json();
};

// LOGIN
export const loginAdmin = async (data) => {
    const res = await fetch(`${API}/admin/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return await res.json();
};

// GET APPOINTMENTS (ADMIN)
export const getAppointments = async (token) => {
    const res = await fetch(`${API}/admin/appointments/`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return await res.json();
};

// UPDATE
export const updateAppointmentApi = async (id, data, token) => {
    const res = await fetch(`${API}/admin/appointments/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    return await res.json();
};

// DELETE
export const deleteAppointmentApi = async (id, token) => {
    const res = await fetch(`${API}/admin/appointments/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return await res.json();
};