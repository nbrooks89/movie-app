import React from "react";
import { Link } from "react-router-dom";
import "./FavoriteCard.css";
import NoPicture from "../../assets/No_Picture.jpg";

function FavoriteCard({ title, id, poster, imgUrl, deleteFavorite }) {
  return (
    <div className="favDetailsContainer">
      <Link to={"/Movie/" + id}>
        <h1>{title}</h1>
        <img src={poster ? imgUrl + poster : NoPicture} alt={title} key={id} />
      </Link>
      <button onClick={deleteFavorite} id={id}>
        Delete
      </button>
    </div>
  );
}

export default FavoriteCard;
