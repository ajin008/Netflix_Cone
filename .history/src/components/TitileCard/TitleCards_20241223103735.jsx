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
      // First, let's get a list of movies
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

        // First fetch the list of movies
        const listResponse = await fetch(
          "https://tbmdb-bollywood-movies-v1.p.rapidapi.com/v1/movies",
          options
        );

        if (!listResponse.ok) {
          throw new Error(`API responded with status ${listResponse.status}`);
        }

        const moviesList = await listResponse.json();

        // Get details for each movie
        const moviesWithDetails = await Promise.all(
          (moviesList.slice(0, 10) || []).map(async (movie) => {
            const detailResponse = await fetch(
              `https://tbmdb-bollywood-movies-v1.p.rapidapi.com/v1/movie/${movie.id}`,
              options
            );
            if (detailResponse.ok) {
              const details = await detailResponse.json();
              return { ...movie, ...details };
            }
            return movie;
          })
        );

        setApiData(moviesWithDetails);
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
    return (
      <div className="Title-card">
        <h2>{title || "Popular Movies"}</h2>
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="Title-card">
        <h2>{title || "Popular Movies"}</h2>
        <div>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="Title-card">
      <h2>{title || "Popular Movies"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.length > 0 ? (
          apiData.map((movie, index) => (
            <div className="card" key={movie.id || index}>
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
