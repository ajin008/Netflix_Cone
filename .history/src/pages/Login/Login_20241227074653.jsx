import React, { useCallback, useState } from "react";
import "./Login.css";
import logo from "../../assets/N-logo.png";

import { login, signup } from "../../firebase";

import netflix_spinner from "../../assets/netflix_spinner.gif";

export const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user_auth = useCallback(async (event) => {
    event.preventDefault();
    setLoading(true);
    if (signState === "Sign In") {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
    setLoading(false);
  });

  const handleNameChange = useCallback((e) => setName(e.target.value), []);
  const handleEmailChange = useCallback((e)=> setName(e.target.value),[])
  const handlePasswordChange = useCallback(
    (e) => setPassword(e.target.value),
    []
  );

  return loading ? (
    <div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>
  ) : (
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
                setName(e.target.value);
              }}
            />
          ) : (
            <></>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleNameChange}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />

          <button onClick={user_auth} type="submit">
            {signState}
          </button>
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