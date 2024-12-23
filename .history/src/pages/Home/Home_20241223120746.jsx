import React from "react";
import { useNavigate } from "react-router-dom";

import "./Home.css";
import { Navbar } from "../../components/Navbar/Navbar";
import hero_banner from "../../assets/movieBanner.jpg";
import hero_title from "../../assets/hero_title.png";
import play_Icon from "../../assets/play_icon.png";
import info_Icon from "../../assets/info_icon.png";
import { TitleCards } from "../../components/TitileCard/TitleCards";
import { Footer } from "../../components/Footer/Footer";

export const Home = () => {
  const navigate = useNavigate()
  const onclick
  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        <img src={hero_banner} alt="" className="banner-img" />
        <div className="overlay"></div>
        <div className="hero-cap">
          <img src={hero_title} alt="" className="caption-img" />
          <p>
            The future of those in the dystopian city of Kasi is altered <br />{" "}
            when the destined arrival of Lord Vishnu's final avatar launches a
            war against darkness.
          </p>
          <div className="hero-btn">
            <button className="btn">
              <img src={play_Icon} alt="" />
              Play
            </button>
            <button className="btn dark-btn">
              <img src={info_Icon} alt="" />
              More Info
            </button>
          </div>
          <TitleCards />
        </div>
      </div>
      <div className="more-cards">
        <TitleCards title={"Blockbuster movie"} />
        <TitleCards title={"Only on Netflix"} />
        <TitleCards title={"Upcoming"} />
        <TitleCards title={"Top pics for you"} />
      </div>
      <Footer />
    </div>
  );
};
