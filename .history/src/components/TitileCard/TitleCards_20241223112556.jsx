import React, { useEffect, useState } from "react";

const MovieComponent = () => {
  const [movies, setMovies] = useState([]);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    // Fetch access token after OAuth login
    const token = "your_access_token";
    setAccessToken(token);

    if (token) {
      fetchMovies(token);
    }
  }, [accessToken]);

  const fetchMovies = async (token) => {
    const response = await fetch("https://api.trakt.tv/movies/popular", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setMovies(data);
  };

  return (
    <div>
      <h1>Popular Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.ids.slug}>
            {movie.title} - {movie.year}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieComponent;
