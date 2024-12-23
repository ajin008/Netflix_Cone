import React, { useRef } from "react";

import "./Navbar.css";

// img import
import logo from "../../assets/logo.png";
import searchIcon from "../../assets/search_icon.svg";
import bellIcon from "../../assets/bell_icon.svg";
import Profile_icon from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";

export const Navbar = () => {

  const navRef = useRef();
  return (
    <div ref={nav} className="navbar">
      {/* left side */}
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul>
          <li>Home</li>
          <li>Tv Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My list</li>
          <li>Browser by Language</li>
        </ul>
      </div>
      {/* right side */}
      <div className="navbar-right">
        <img src={searchIcon} alt="" className="icons" />
        <p>Children</p>
        <img src={bellIcon} alt="" className="icons" />
        <div className="navbar-profile">
          <img src={Profile_icon} alt="" className="profile" />
          <img src={caret_icon} alt="" />
          <div className="dropdown">
            <p>sign out of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  );
};
