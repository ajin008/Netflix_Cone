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
      // You can get a free API key from http://www.omdbapi.com/apikey.aspx
      const OMDB_API_KEY = "YOUR_API_KEY"; // Replace with your API key
      const searchQueries = ["bollywood", "hindi"]; // You can modify these search terms

      try {
        setIsLoading(true);
        setError(null);

        // Fetch movies for each search term
        const moviesPromises = searchQueries.map((query) =>
          fetch(
            `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query}&type=movie`
          ).then((res) => res.json())
        );

        const results = await Promise.all(moviesPromises);
        const allMovies = results
          .filter((result) => result.Response === "True")
          .flatMap((result) => result.Search || [])
          .filter(
            (movie, index, self) =>
              index === self.findIndex((m) => m.imdbID === movie.imdbID)
          );

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
