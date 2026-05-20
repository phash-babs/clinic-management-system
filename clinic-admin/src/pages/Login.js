import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const API = process.env.REACT_APP_API; 
    // IMPORTANT: must be in .env

    const login = async () => {
        setLoading(true);

        try {
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

                // ✅ correct SPA navigation
                navigate("/dashboard");
            } else {
                alert(data.detail || "Login failed");
            }

        } catch (err) {
            console.log(err);
            alert("Network error");
        } finally {
            setLoading(false);
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

            <button onClick={login} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>

        </div>
    );
}