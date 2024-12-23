import React, { useEffect } from "react";
import {Routes,Route} from 'react-router-'
import { onAuthStateChanged } from "firebase/auth";

import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Player } from "./pages/Player/Player";
import { auth } from "./firebase";

const App = () => {
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
    <div>
      <Routes>
        <Route path="/home_page" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </div>
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
