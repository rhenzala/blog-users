import { useState } from "react";
import { login } from "../utils/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await login(username, password);
            if (user.role !== "USER") throw new Error("Access Denied");
            setUser(user);
            navigate("/");
        } catch (err) {
            alert(error.message);
        }
    }
    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit} className="bg-zinc-300 dark:bg-zinc-700 py-12 px-8 rounded-lg flex flex-col gap-4 w-fit">
                <label htmlFor="username" className="flex flex-col gap-1">
                    <span className="text-sm">Username</span>
                    <input 
                        type="text" 
                        name="username" 
                        id="username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-48 lg:w-64 outline-none focus:outline focus:outline-2 focus:outline-blue-500 p-2 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm"
                        required
                    />
                </label>
                <label htmlFor="password" className="flex flex-col gap-1">
                    <span className="text-sm">Password</span>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-48 lg:w-64 outline-none focus:outline focus:outline-2 focus:outline-blue-500 p-2 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm"
                        required
                    />
                </label>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 hover:cursor-pointer transition delay-200 ease-in">Login</button>
            </form>
        </div>
    )
}

export default Login;
