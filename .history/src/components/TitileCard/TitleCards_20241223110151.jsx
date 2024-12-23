import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";

export const TitleCards = ({ title }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  // RapidAPI IMDb credentials
  const API_KEY = "b57c6709femshabbf44003f060fap1fa928jsn82de7f22e136";
  const API_HOST = "imdb236.p.rapidapi.com";

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    // Fetch movie data from IMDb API
    const fetchMovies = async () => {
      const url = "https://imdb236.p.rapidapi.com/movies/coming-soon"; // Replace with the endpoint you want
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": API_HOST,
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setApiData(result.movies); // Adjust this based on the actual response structure
      } catch (error) {
        console.error("Error fetching IMDb data:", error);
      }
    };

    fetchMovies();

    const currentRef = cardsRef.current;
    cardsRef.current.addEventListener("wheel", handleWheel);
    return () => {
      currentRef.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="Title-card">
      <h2>{title ? title : "Popular Movies"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <div className="card" key={index}>
              <img
                src={card.image || "placeholder.jpg"} // Adjust field name based on API response
                alt={card.name || "Movie Title"}
              />
              <p className="card-title">{card.name || "Unknown Title"}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
