import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";

export const TitleCards = ({ title }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  // Function to create the appropriate query based on the title prop
  const getApiQuery = (title) => {
    switch (title.toLowerCase()) {
      case "blockbuster movies":
        return `https://www.omdbapi.com/?s=blockbuster&apikey=${API_KEY}`; // Placeholder query for blockbuster
      case "now playing":
        return `https://www.omdbapi.com/?s=now+playing&apikey=${API_KEY}`; // Placeholder query for now playing
      default:
        return `https://www.omdbapi.com/?s=batman&apikey=${API_KEY}`; // Default to searching for Batman
    }
  };

  useEffect(() => {
    // Dynamically construct the API URL based on the title
    const query = getApiQuery(title);

    fetch(query)
      .then((res) => res.json())
      .then((res) => {
        if (res.Search) {
          setApiData(res.Search);
        }
      })
      .catch((err) => console.error(err));

    const currentRef = cardsRef.current;
    cardsRef.current.addEventListener("wheel", handleWheel);
    return () => {
      currentRef.removeEventListener("wheel", handleWheel);
    };
  }, [title]); // Re-run when the title prop changes

  return (
    <div className="Title-card">
      <h2>{title ? title : "Popular Movies"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <div className="card" key={index}>
            <img
              src={card.Poster !== "N/A" ? card.Poster : "placeholder.jpg"}
              alt={card.Title}
            />
            <p className="card-title">{card.Title}</p>
            {/* <p>Year: {card.Year}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};
