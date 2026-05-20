import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {

    const token = localStorage.getItem("token");

    return (

        <BrowserRouter>

            <Routes>

                {/* HOME ROUTE */}
                <Route
                    path="/"
                    element={
                        token
                            ? <Navigate to="/dashboard" />
                            : <Navigate to="/login" />
                    }
                />

                {/* LOGIN */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* DASHBOARD */}
                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;