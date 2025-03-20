import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from './components/Header';
import Main from './components/Main';

function App() {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  useEffect(() => {
    try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        setUser(null);
    }
}, []);


  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <Main user={user} setUser={setUser} />
    </Router>
  );
}

export default App;
