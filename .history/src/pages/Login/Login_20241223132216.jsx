import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/N-logo.png";

import {login,signup}

import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { Footer } from "./Footer";

export const Login = () => {
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  return (
    <div className="login">
      <img src={logo} className="login-logo" alt="" />
      <div className="login-form">
        <h1>Sign In</h1>
        <form action="">
          <input type="text" placeholder="Email or mobile number" />

          <div className="relative">
            <input
              type={type}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
            />
            <span onClick={handleToggle}>
              <Icon icon={icon} size={25} />
            </span>
          </div>

          <button>Sing In</button>
          <div className="or-container">
            <span>or</span>
          </div>
          <button className="second-btn">Use a sign-in code</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          <p>
            New to Netflix? <span>Sign Up Now</span>{" "}
          </p>
          <p className="second-p">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot
            <a href="">Learn more</a>
          </p>
        </div>
      </div>
    </div>
  );
};
