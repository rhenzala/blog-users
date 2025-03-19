const Header = ({ setShowLogin }) => {
    return (
        <header className="flex justify-between items-center px-4 md:px-[10%] lg:px-[20%] h-16">
            <div className="text-2xl font-bold">
                <span>MiniBlog</span>
            </div>
            <nav className="flex gap-2">
                <button 
                    className="bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 rounded-md px-4 py-2 hover:cursor-pointer"
                    onClick={() => setShowLogin(prev => !prev)}
                >
                    Login
                </button>
                <button className="border-zinc-900 dark:border-zinc-100 border border-solid text-zinc-900 dark:text-zinc-100 rounded-md px-4 py-2 hover:cursor-pointer">
                    Signup
                </button>
            </nav>
        </header>
    );
};

export default Header;
