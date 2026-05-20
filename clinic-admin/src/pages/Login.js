import React, { useState } from "react";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const API = "http://127.0.0.1:8000";

    const login = async () => {
        const res = await fetch(`${API}/admin/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const data = await res.json();

        console.log("LOGIN RESPONSE:", data);

        if (res.ok) {
            localStorage.setItem("token", data.access_token);
            window.location.href = "/";
        } else {
            alert(data.detail);
        }
    };

    return (
        <div style={{ padding: 40 }}>
            <h2>Admin Login</h2>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={login}>Login</button>
        </div>
    );
}