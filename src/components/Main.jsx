import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Feed from "./Feed";
import Register from "./Register";
import Blog from "./Blog";

const Main = ({ user, setUser }) => {
    const isAuthenticated = localStorage.getItem("token") !== null;

    return (
        <main className="px-2 md:px-[10%] lg:px-[20%] 2xl:px-[30%]">
            <div className="min-h-screen flex flex-col p-4">
                <Routes>
                    <Route 
                        path="/" 
                        element={isAuthenticated && !user ? <Navigate to="/login" /> : <Feed user={user} isAuthenticated={isAuthenticated} />} 
                    />
                    <Route path="/login" element={<Login setUser={setUser} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/:id" element={<Blog user={user} />} />
                </Routes>
            </div>
        </main>
    );
};

export default Main;
