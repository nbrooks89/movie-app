import React from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";
import NoPicture from "./No_Picture.jpg";

function MovieList({ title, id, poster, imgUrl }) {
  return (
    <div className="cardDetailsContainer">
      <Link to={"/Movie/" + id} title1={title}>
        <div className="movieTitle">{title}</div>
        <img src={poster ? imgUrl + poster : NoPicture} alt={title} key={id} />
      </Link>
    </div>
  );
}

export default MovieList;
