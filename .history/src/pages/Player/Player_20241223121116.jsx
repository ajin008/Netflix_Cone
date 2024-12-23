import React from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate } from "react-router-dom";

export const Player = () => {
  const navigate = useNavigate()
  const handleBackArrow = ()=>{
    
  }
  return (
    <div className="player">
      <img src={back_arrow_icon} alt="" />
      <iframe
        width="90%"
        height="90%"
        src="https://www.youtube.com/embed/U8XH3W0cMss"
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>December 12</p>
        <p>RedOne</p>
        <p>Action</p>
      </div>
    </div>
  );
};
