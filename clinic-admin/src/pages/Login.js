import ClinicBrand from "../components/ClinicBrand";
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
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

        <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">

            <ClinicBrand />

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border p-3 rounded-lg mb-4"
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-3 rounded-lg mb-6"
            />

            <button
                onClick={login}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
            >
                {loading ? "Logging in..." : "Login"}
            </button>

        </div>

    </div>
);
}