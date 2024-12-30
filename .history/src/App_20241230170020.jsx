import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
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
      } else {
        setLog(false);
        if (window.location.pathname !== "/login") navigate("/login");
      }
    });
  }, [navigate]);

  const PrivateRoute = ({ element }) => {
    return isLog ? element : <Navigate to="/login" />;
  };

  return (
    <authContext.Provider value={{ isLog, setLog }}>
      <ToastContainer theme="dark" />
      <Routes>
        <Route
          path="/home_page"
          element={<PrivateRoute element={<Home />} />}
        />
        <Route
          path="/player/:id"
          element={<PrivateRoute element={<Player />} />}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </authContext.Provider>
  );
};

export default App;