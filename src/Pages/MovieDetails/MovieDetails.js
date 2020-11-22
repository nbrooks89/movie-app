import React, { useState, useEffect } from "react";
import NoPicture from "../../assets/No_Picture.jpg";
import "./MovieDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
function MovieDetails({ match }) {
  const [movieDetails, setMovieDetails] = useState([]);
  const [cast, setCast] = useState([]);
  const [favorites, setFavorites] = useState([]);

  console.log(favorites);
  const handleGetDetails = () => {
    const key = process.env.REACT_APP_MOVIE_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${key}&append_to_response=credits&page=1`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setMovieDetails(res);
        setCast(res.credits.cast);
        console.log(res.id);
      });
  };

  const addFav = () => {
    console.log("click");
    let newArray = favorites;
    let isNewItem = true;
    console.log(newArray);
    console.log(favorites);
    favorites.forEach((item, i) => {
      if (item.id + "" === movieDetails.id + "") {
        newArray[i].thumbsUp++;
        isNewItem = false;

        return newArray;
      }
    });
    if (isNewItem === true) {
      newArray.push({
        id: movieDetails.id,
        title: movieDetails.title,
        thumbsUp: 1,
        thumbsDown: 0,
      });
      return newArray;
    }
    setFavorites(newArray);

    localStorage.setItem("films", JSON.stringify(newArray));
  };

  useEffect(() => {
    let getFavs = localStorage.getItem("films");
    getFavs = JSON.parse(getFavs);

    console.log(getFavs);
    handleGetDetails();
    setFavorites(getFavs);
    console.log(favorites);
    console.log(cast);
  }, []);

  return (
    <div className="movieDetailsContainer">
      <div className="detailsInnerContainer">
        <img
          src={
            movieDetails.poster_path
              ? "https://image.tmdb.org/t/p/w400" + movieDetails.poster_path
              : NoPicture
          }
          alt={movieDetails.title}
        />
        <h1>{movieDetails.title}</h1>
        <div>{movieDetails.release_date}</div>
        <div>{movieDetails.overview}</div>

        <FontAwesomeIcon
          onClick={addFav}
          icon={faThumbsUp}
          size="3x"
          color="rgb(169, 169, 177)"
        />
      </div>
    </div>
  );
}

export default MovieDetails;
