import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/N-logo.png";

import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

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
        <h1>sign up</h1>
        <form>
          <input type="text" placeholder="Your name" />
          <input type="text" placeholder="Email" />
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
          <button>sign up</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
          </div>
        </form>
        <div className="form-switch">
          <p>New to Netflix?</p>
        </div>
      </div>
    </div>
  );
};
