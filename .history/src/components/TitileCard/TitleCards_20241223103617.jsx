import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";

export const TitleCards = ({ title }) => {
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const cardsRef = useRef();

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "b57c6709femshabbf44003f060fap1fa928jsn82de7f22e136",
          "x-rapidapi-host": "tbmdb-bollywood-movies-v1.p.rapidapi.com",
        },
      };

      try {
        setIsLoading(true);
        setError(null);

        // Using the correct endpoint format
        const response = await fetch(
          "https://tbmdb-bollywood-movies-v1.p.rapidapi.com/v1/movies",
          options
        );

        if (!response.ok) {
          throw new Error(`API responded with status ${response.status}`);
        }

        const data = await response.json();
        setApiData(data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Failed to load movies. Please try again later.");
        setApiData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();

    const currentRef = cardsRef.current;
    currentRef.addEventListener("wheel", handleWheel);
    return () => {
      currentRef.removeEventListener("wheel", handleWheel);
    };
  }, []);

  if (isLoading) {
    return <div className="Title-card">Loading...</div>;
  }

  if (error) {
    return <div className="Title-card">Error: {error}</div>;
  }

  return (
    <div className="Title-card">
      <h2>{title || "Popular Movies"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.length > 0 ? (
          apiData.map((movie, index) => (
            <div className="card" key={index}>
              <img
                src={movie.poster_url || movie.image_url}
                alt={movie.title}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x450?text=No+Image";
                }}
              />
              <p>{movie.title || movie.name}</p>
            </div>
          ))
        ) : (
          <div>No movies found</div>
        )}
      </div>
    </div>
  );
};
