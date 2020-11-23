import React, { useState, useEffect } from "react";
import NoPicture from "../../assets/No_Picture.jpg";
import "./MovieDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
function MovieDetails({ match }) {
  const [movieDetails, setMovieDetails] = useState([]);
  //   const [cast, setCast] = useState([]);
  const [favorites, setFavorites] = useState([]);

  console.log(favorites);
  const handleGetDetails = () => {
    const key = process.env.REACT_APP_MOVIE_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${key}&append_to_response=credits&page=1`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setMovieDetails(res);
        // setCast(res.credits.cast);
        console.log(res.id);
      });
  };

  const addFav = () => {
    let newArray = [...favorites];
    let isNewItem = true;

    favorites.forEach((item, i) => {
      if (item.id + "" === movieDetails.id + "") {
        newArray[i].thumbsUp++;
        isNewItem = false;
      }
      setFavorites(newArray);
      return newArray;
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
    const favoritesList = JSON.parse(localStorage.getItem("films"));
    if (favoritesList) {
      setFavorites(favoritesList);
      console.log(favoritesList);
      console.log(favorites);
    }
    handleGetDetails();
  }, []);

  const favItem = favorites.find((fav) => fav.id === movieDetails.id);
  console.log(favItem);

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
        <div>{favItem?.thumbsUp}</div>

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
