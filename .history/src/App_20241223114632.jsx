import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home_page" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path='/player/:id'/>
      </Routes>
    </Router>
  );
}

export default App;
