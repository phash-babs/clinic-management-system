const API = "http://127.0.0.1:8000";

// Load available slots when date changes
document.getElementById("date").addEventListener("change", async function () {
    const date = this.value;

    const res = await fetch(`${API}/available-slots/?appointment_date=${date}`);
    const data = await res.json();

    const dropdown = document.getElementById("time_slot");
    dropdown.innerHTML = "<option value=''>Select Time Slot</option>";

   const slots = data.available_slots || [];

slots.forEach(slot => {
    const option = document.createElement("option");
    option.value = slot;
    option.textContent = slot;
    dropdown.appendChild(option);
});
});

// Book appointment
async function bookAppointment() {
    const payload = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        reason: document.getElementById("reason").value,
        appointment_date: document.getElementById("date").value,
        time_slot: document.getElementById("time_slot").value
    };

    const res = await fetch(`${API}/appointments/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    const data = await res.json();

    const msg = document.getElementById("message");

    if (res.ok) {
        msg.innerHTML = "Appointment booked successfully!";
        msg.className = "success";
       
    } else {
        msg.innerHTML = data.detail;
        msg.className = "error";
    }
}


