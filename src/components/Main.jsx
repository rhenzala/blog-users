import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./Login";
import Feed from "./Feed";

const Main = () => {
    const [user, setUser] = useState(null);

    return (
        <main className="px-4 md:px-[10%] lg:px-[20%]">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={user ? <Feed /> : <Login setUser={setUser} />} />
                </Routes>
            </BrowserRouter>
        </main>
    );
};

export default Main;
