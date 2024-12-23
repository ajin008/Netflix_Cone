import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";

export const TitleCards = ({ title }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  // const API_KEY = "bc26c5dc";
  const API_KEY = process.env.REACT_APP_API_KEY;


  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?s=batman&apikey=${API_KEY}`)
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
