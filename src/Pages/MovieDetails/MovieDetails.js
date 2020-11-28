import React, { useState, useEffect } from "react";
import NoPicture from "../../assets/No_Picture.jpg";
import "./MovieDetails.css";
import moment from "moment";

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
        console.log(res.credits.cast);
      });
  };
  const windowGlobal = typeof window !== "undefined" && window;
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
        thumbsDown: null,
      });
      return newArray;
    }
    setFavorites(newArray);
    windowGlobal.localStorage.setItem("films", JSON.stringify(newArray));
  };
  const addDislike = () => {
    let newArray = [...favorites];
    let isNewItem = true;

    favorites.forEach((item, i) => {
      if (item.id + "" === movieDetails.id + "") {
        newArray[i].thumbsDown++;
        isNewItem = false;
      }
      setFavorites(newArray);
      return newArray;
    });
    if (isNewItem === true) {
      newArray.push({
        id: movieDetails.id,
        title: movieDetails.title,
        thumbsUp: null,
        thumbsDown: 1,
      });
      return newArray;
    }
    setFavorites(newArray);
    windowGlobal.localStorage.setItem("films", JSON.stringify(newArray));
  };

  useEffect(() => {
    const favoritesList = JSON.parse(
      windowGlobal.localStorage.getItem("films")
    );
    if (favoritesList) {
      setFavorites(favoritesList);
      console.log(favoritesList);
      console.log(favorites);
    }
    handleGetDetails();
    window.scrollTo(0, 0);
  }, []);

  const favItem = favorites.find((fav) => fav.id === movieDetails.id);
  console.log(favItem);

  return (
    <div className="detailsPage">
      <div className="movieDetailsContainer">
        <h1>{movieDetails.title}</h1>
        <div className="detailsInnerContainer">
          <div className="detailsLeft">
            <img
              src={
                movieDetails.poster_path
                  ? "https://image.tmdb.org/t/p/w400" + movieDetails.poster_path
                  : NoPicture
              }
              alt={movieDetails.title}
            />
          </div>

          <div className="detailsRight">
            <div className="releaseDate">
              Release Date: &nbsp;
              {moment(movieDetails.release_date).format("MMMM Do YYYY")}
            </div>
            <div>{movieDetails.overview}</div>
            <div className="thumbs">
              <div className="thumbsUp">
                <FontAwesomeIcon
                  onClick={addFav}
                  icon={faThumbsUp}
                  size="3x"
                  color="rgb(169, 169, 177)"
                />
                <div className="thumbsUpNumber">{favItem?.thumbsUp}</div>
              </div>
              <div className="thumbsDown">
                <FontAwesomeIcon
                  onClick={addDislike}
                  icon={faThumbsDown}
                  size="3x"
                  color="rgb(169, 169, 177)"
                />
                <div className="thumbsDownNumber">{favItem?.thumbsDown}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cast">CAST:</div>
      <div className="movieActorGrid">
        {cast.map((actor) => {
          return (
            <>
              <div className="actorCardContainer">
                <div>{actor.name}</div>
                <img
                  src={
                    actor.profile_path
                      ? "https://image.tmdb.org/t/p/w400" + actor.profile_path
                      : NoPicture
                  }
                  alt={actor.name}
                />
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default MovieDetails;
