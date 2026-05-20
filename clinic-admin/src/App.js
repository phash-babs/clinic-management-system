import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* PATIENT PAGE */}
                <Route path="/" element={<Home />} />

                {/* ADMIN LOGIN */}
                <Route path="/login" element={<Login />} />

                {/* ADMIN DASHBOARD */}
                <Route path="/dashboard" element={<Dashboard />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;