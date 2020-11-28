import React, { useState, useEffect } from "react";
import NoPicture from "../../assets/No_Picture.jpg";
import "./MovieDetails.css";
import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";

function MovieDetails({ match, setFavoritesList, favorites }) {
  const [movieDetails, setMovieDetails] = useState([]);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState("");

  const handleGetDetails = () => {
    const key = process.env.REACT_APP_MOVIE_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${key}&append_to_response=credits&page=1`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setMovieDetails(res);
        setCast(res.credits.cast);
        res.credits.crew.forEach(function (entry) {
          if (entry.job === "Director") {
            setDirector(entry.name);
          }
          console.log("director", director);
        });
      });
  };

  const addFav = () => {
    const favObj = {
      id: movieDetails.id,
      title: movieDetails.title,
      poster_path: movieDetails.poster_path,
      thumbsUp: 1,
      thumbsDown: null,
    };
    if (!localStorage.getItem("films")) {
      localStorage.setItem("films", JSON.stringify([favObj]));
      setFavoritesList([favObj]);
    } else {
      let newArray = [...favorites];
      let isNewItem = true;

      favorites.forEach((item, i) => {
        if (item.id + "" === movieDetails.id + "") {
          newArray[i].thumbsUp++;
          isNewItem = false;
          setFavoritesList(newArray);
          return newArray;
        }
      });
      if (isNewItem === true) {
        newArray.push(favObj);
        setFavoritesList(newArray);
      }
      localStorage.setItem("films", JSON.stringify(newArray));
      return newArray;
    }
  };
  const addDislike = () => {
    const dislikeObj = {
      id: movieDetails.id,
      title: movieDetails.title,
      thumbsUp: null,
      thumbsDown: 1,
    };
    if (!localStorage.getItem("films")) {
      localStorage.setItem("films", JSON.stringify([dislikeObj]));
      setFavoritesList([dislikeObj]);
    } else {
      let newArray = [...favorites];
      let isNewItem = true;

      favorites.forEach((item, i) => {
        if (item.id + "" === movieDetails.id + "") {
          newArray[i].thumbsDown++;
          isNewItem = false;
          setFavoritesList(newArray);
          return newArray;
        }
      });
      if (isNewItem === true) {
        newArray.push(dislikeObj);
        setFavoritesList(newArray);
      }
      localStorage.setItem("films", JSON.stringify(newArray));
      return newArray;
    }
  };

  useEffect(() => {
    const favoritesList = JSON.parse(localStorage.getItem("films"));
    if (favoritesList) {
      setFavoritesList(favoritesList);
      console.log(favoritesList);
      console.log(favorites);
    }
    handleGetDetails();
    window.scrollTo(0, 0);
  }, []);

  const favItem = favorites.find((fav) => fav.id === movieDetails.id);

  return (
    <div className="detailsPage">
      <section className="movieDetailsContainer">
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
            <p>{movieDetails.overview}</p>
            {movieDetails.release_date !== "" && (
              <p className="releaseDate">
                <b>Release Date</b>: &nbsp;
                {moment(movieDetails.release_date).format("MMMM Do YYYY")}
              </p>
            )}
            {director !== "" && (
              <p>
                <b>Director</b>:&nbsp;{director}
              </p>
            )}
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
      </section>
      <div className="cast">CAST:</div>
      <section className="movieActorGrid">
        {cast.map((actor) => {
          return (
            <>
              <div className="actorCardContainer">
                <p>{actor.name}</p>
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
      </section>
    </div>
  );
}

export default MovieDetails;
