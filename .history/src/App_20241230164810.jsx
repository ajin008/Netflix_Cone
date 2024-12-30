import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Player } from "./pages/Player/Player";
import { auth } from "./firebase";

import { ToastContainer, toast } from "react-toastify";
import { createContext } from "react";

const authContext = createContext();

const App = () => {
  const navigate = useNavigate();
  const [isLog, setLog] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLog(true);
        if (window.location.pathname !== "/home_page") navigate("/home_page");
        toast.success("Welcome back!");
      } else {
        setLog(false);
        if (window.location.pathname !== "/login") navigate("/login");
        toast.info("Logged out successfully!");
      }
    });
  }, []);

  return (
    <authContext.Provider value={{ isLog, setLog }}>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/home_page" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </authContext.Provider>
  );
};

export default App;

{
  /* <Router>
      <Routes>
        <Route path="/home_page" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        
      </Routes>
    </Router> */
}
