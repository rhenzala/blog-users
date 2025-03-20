import { logout } from "../utils/api";
import { useNavigate } from "react-router-dom";

const Header = ({user, setUser}) => {
    const navigate = useNavigate();
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await logout();
            localStorage.removeItem("user");  
            setUser(null);  
            navigate("/login");  
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    
    return (
        <header className="flex justify-between items-center px-4 md:px-[10%] lg:px-[20%] h-16">
            <div className="text-2xl font-bold">
                <span>MiniBlog</span>
            </div>
            <nav className="flex gap-2">
                {user ? 
                    <button 
                        className="bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 hover:bg-zinc-100 hover:text-zinc-900   rounded-md px-4 py-2 hover:cursor-pointer"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                : ""
                }
            </nav>
        </header>
    );
};

export default Header;
