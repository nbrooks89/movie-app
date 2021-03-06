import React from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";
import NoPicture from "../../assets/No_Picture.jpg";

function MovieCard({ title, id, poster, imgUrl }) {
  return (
    <div className="cardDetailsContainer">
      <Link to={"/Movie/" + id}>
        <div className="movieTitle">{title}</div>
        <img src={poster ? imgUrl + poster : NoPicture} alt={title} key={id} />
      </Link>
    </div>
  );
}

export default MovieCard;
