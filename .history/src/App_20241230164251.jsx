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
        console.log("logged in");
        navigate("/home_page");
      } else {
        navigate("/login");
        console.log("logged out");
      }
    });
  }, []);

  return (
    <.Provider value={{isLog,setLog}}>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/home_page" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </.Provider>
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
