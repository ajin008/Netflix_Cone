import React from 'react'
import "./Login.css";
import logo from "../../assets/N-logo.png";

export const Login = () => {
  return (
    <div className="login">
      <img src={logo} className='login-logo' alt="" />
      <div className='login-form'>
        <h1>sign up</h1>
        <form>
          <input type="text" placeholder='your name'/>
          <input type="text" placeholder='your name'/>
          <input type="text" placeholder='your name'/>
        </form>
      </div>
    </div>
  )
}

