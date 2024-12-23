import React from 'react'
import "./Login.css";
import logo from "../../assets/N-logo.png";

export const Login = () => {
  return (
    <div className="login">
      <img src={logo} className='login-logo' alt="" />
      <div className='log'></div>
    </div>
  )
}
