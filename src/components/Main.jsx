import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Feed from "./Feed";
import Register from "./Register";

const Main = ({ user, setUser }) => {
    return (
        <main className="px-4 md:px-[10%] lg:px-[20%]">
            <div className="min-h-screen flex flex-col p-4">
                <Routes>
                    <Route path="/" element={user ? <Feed /> : <Navigate to="/login" />} />
                    <Route path="/login" element={<Login setUser={setUser} />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </main>
    );
};

export default Main;
