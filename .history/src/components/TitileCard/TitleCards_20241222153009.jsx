import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";

export const TitleCards = ({ title, categroy }) => {
  const [apiData, setApiData] = useState([]);

  const cardsRef = useRef();

  // for fetching movie data

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDhmNTI4NDhkYTExZmVlMTI4ZTgyN2QzYzgyMTY0MyIsIm5iZiI6MTczNDg1OTcyMy40NzEsInN1YiI6IjY3NjdkYmNiNDFkYjJiNGI5Yzc0YjJjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sJuNH0IG8RD8zsbTLZw57iv_wWrDft2oabxis9B-9gE",
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      options
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        console.log("API Response:", res); // Debug
        setApiData(res.results || []); // Fallback for empty data
      })
      .catch((err) => console.error("Error fetching TMDb API data:", err));

    const currentRef = cardsRef.current;
    if (currentRef) {
      currentRef.addEventListener("wheel", handleWheel);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div className="Title-card">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list " ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <div className="card" key={index}>
              <img
                src={`http://image.tmdb.org/t/p/w500` + card.backdrop_path}
                alt=""
              />
              <p>{card.original_title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
