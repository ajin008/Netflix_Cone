import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";

export const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  // Trakt API: Fetch popular movies using Client ID
  useEffect(() => {
    // URL to fetch popular movies from Trakt
    const url = "https://api.trakt.tv/movies/popular?page=1&limit=10";

    // Fetch data from Trakt API
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "trakt-api-key":
          "1f23600d63eba10404c055607122dc9766dac00a144557d2bb729129840967d1", // Your Client ID
        "trakt-api-version": "2",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setApiData(res); // Set the popular movies data
      })
      .catch((err) => console.error("Error fetching data from Trakt:", err));

    // Handle scroll functionality
    const currentRef = cardsRef.current;
    cardsRef.current.addEventListener("wheel", handleWheel);
    return () => {
      currentRef.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  return (
    <div className="Title-card">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <div className="card" key={index}>
              <img
                src={`https://walter.trakt.us/images${card.images?.poster}`}
                alt={card.title}
              />
              <p>{card.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
