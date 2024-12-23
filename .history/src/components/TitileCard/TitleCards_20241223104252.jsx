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
      const OMDB_API_KEY = "bc26c5dc";
      const searchQueries = ["bollywood", "hindi"];

      try {
        setIsLoading(true);
        setError(null);

        const moviesPromises = searchQueries.map((query) =>
          fetch(
            `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query}&type=movie`
          ).then((res) => res.json())
        );

        const results = await Promise.all(moviesPromises);

        const allMovies = results
          .filter((result) => result.Response === "True")
          .flatMap((result) => result.Search || [])
          .filter(
            (movie, index, self) =>
              index === self.findIndex((m) => m.imdbID === movie.imdbID)
          )
          .slice(0, 20);

        setApiData(allMovies);
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
        <h2>{title}</h2>
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="Title-card">
        <h2>{title}</h2>
        <div>{error}</div>
      </div>
    );
  }

  return (
    <div className="Title-card">
      <h2>{title}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.length > 0 ? (
          apiData.map((movie) => (
            <div className="card" key={movie.imdbID}>
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={movie.Title}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x450?text=No+Image";
                }}
              />
              <p>{movie.Title}</p>
            </div>
          ))
        ) : (
          <div>No movies found</div>
        )}
      </div>
    </div>
  );
};
