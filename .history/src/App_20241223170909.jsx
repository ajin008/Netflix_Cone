import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Player } from "./pages/Player/Player";
import { auth } from "./firebase";

function App() {

  const navigate = useNavigate()

  useEffect(()=>{
    onAuthStateChanged(auth,async(user)=>{
      if(user){
        console.log('logged in')
        navigate('')
      }else{
        console.log('logged out')
      }
    })
  },[])

  return (
    <Router>
      <Routes>
        <Route path="/home_page" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </Router>
  );
}

export default App;
