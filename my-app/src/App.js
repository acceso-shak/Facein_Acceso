import React from "react";
import "./App.css";
import Login from "./login";
import Signup from "./signup"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ForgetPassword from "./forgetPassword";
import Homepage from "./homepage";
import AboutUS from "./about";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<AboutUS />} />
        <Route path="/forget_password" element={<ForgetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;