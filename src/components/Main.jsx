import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./Login";
import Feed from "./Feed";
import Register from "./Register";

const Main = () => {
    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem("user")) || null;
    });

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    return (
        <main className="px-4 md:px-[10%] lg:px-[20%]">
            <Router>
                <div className="min-h-screen flex flex-col items-center justify-center p-4">
                    <Routes>
                        <Route path="/" element={user ? <Feed /> : <Navigate to="/login" />} />
                        <Route path="/login" element={<Login setUser={setUser} />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </div>
            </Router>
        </main>
    );
};

export default Main;
