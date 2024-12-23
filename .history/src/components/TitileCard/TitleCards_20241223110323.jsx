import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";

export const TitleCards = ({ title }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  // IMDb API Key
  const API_KEY = "b57c6709femshabbf44003f060fap1fa928jsn82de7f22e136";

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  // Function to fetch movie data with rate limit handling
  const fetchMovies = async () => {
    const url = "https://imdb236.p.rapidapi.com/movies/coming-soon";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "imdb236.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);

      if (response.ok) {
        const result = await response.json();
        if (result && result.results) {
          setApiData(result.results); // Assuming 'results' contains the data
        }
      } else if (response.status === 429) {
        console.error("Rate limit exceeded. Retrying after a delay...");
        // Retry after 1 second (1000ms)
        setTimeout(fetchMovies, 1000);
      }
    } catch (error) {
      console.error("Error fetching movie data: ", error);
    }
  };

  useEffect(() => {
    fetchMovies(); // Fetch data on component mount

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
                src={card.Poster !== "N/A" ? card.Poster : "placeholder.jpg"}
                alt={card.Title}
              />
              <p className="card-title">{card.Title}</p>
              {/* <p>Year: {card.Year}</p> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};
