import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/N-logo.png";

// import { Icon } from "react-icons-kit";
// import { eyeOff } from "react-icons-kit/feather/eyeOff";
// import { eye } from "react-icons-kit/feather/eye";

// import { login, signup } from "../../firebase";

export const Login = () => {
  const [signState, setSignState] = useState("Sign In");

  // const [Password, updatePassword] = useState("");
  // const [type, setType] = useState("password");
  // const [icon, setIcon] = useState(eyeOff);

  // const handleToggle = () => {
  //   if (type === "password") {
  //     setIcon(eye);
  //     setType("text");
  //   } else {
  //     setIcon(eyeOff);
  //     setType("password");
  //   }
  // };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login">
      <img src={logo} className="login-logo" alt="" />
      <div className="login-form">
        <h1>{signState}</h1>

        <form>
          {signState === "Sign Up" ? (
            <input
              type="text"
              value={name}
              placeholder="Your name"
              onChange={(e) => {
                e.target.value;
              }}
            />
          ) : (
            <></>
          )}

          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              e.target.value;
            }}
          />
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => e.target.value}
              placeholder="Password"
            />
            <span onClick={handleToggle}>
              <Icon icon={icon} size={25} />
            </span>
          </div>
          <button>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to Netflix?{" "}
              <span
                onClick={() => {
                  setSignState("Sign Up");
                }}
              >
                Sign Up Now
              </span>
            </p>
          ) : (
            <p>
              Already have account?{" "}
              <span
                onClick={() => {
                  setSignState("Sign In");
                }}
              >
                Sign In Now
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
