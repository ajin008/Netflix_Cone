import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";

export const TitleCards = ({ title }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': 'b57c6709femshabbf44003f060fap1fa928jsn82de7f22e136',
          'x-rapidapi-host': 'tbmdb-bollywood-movies-v1.p.rapidapi.com'
        }
      };

      try {
        // This will fetch latest Bollywood movies
        const response = await fetch(
          'https://tbmdb-bollywood-movies-v1.p.rapidapi.com/v1/movies/latest',
          options
        );
        const data = await response.json();
        setApiData(data.results || []); // Adjust based on actual API response structure
      } catch (error) {
        console.error('Error fetching movies:', error);
        setApiData([]); // Set empty array in case of error
      }
    };

    fetchMovies();

    const currentRef = cardsRef.current;
    currentRef.addEventListener("wheel", handleWheel);
    return () => {
      currentRef.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="Title-card">
      <h2>{title || "Popular Movies"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((movie, index) => (
          <div className="card" key={index}>
            <img
              src={movie.poster_url || movie.image_url} // Adjust based on actual API response
              alt={movie.title}
              onError={(e) => {
                e.target.src = 'path/to/fallback/image.jpg'; // Add a fallback image
              }}
            />
            <p>{movie.title || movie.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};