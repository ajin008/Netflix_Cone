import React from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";

export const Player = () => {
  return (
    <div className="player">
      <img src={back_arrow_icon} alt="" />
      <iframe
        width="90"
        height="90"
        src="https://www.youtube.com/embed/U8XH3W0cMss"
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="">
        <p>Published Date</p>
        <p>Name</p>
        <p>Type</p>
      </div>
    </div>
  );
};
