import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Player } from "./pages/Player/Player";
import { auth } from "./firebase";

// Create a separate component for the routes and navigation logic
function AppContent() {
  const navigate = useNavigate();

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
    <Routes>
      <Route path="/home_page" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/player/:id" element={<Player />} />
    </Routes>
  );
}

// Main App component
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
