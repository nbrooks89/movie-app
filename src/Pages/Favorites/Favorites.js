import React, { useEffect } from "react";
import "./Favorites.css";
import FavoriteCard from "../../Components/FavoriteCard/FavoriteCard";

function Favorites({ favorites, setFavoritesList }) {
  const deleteFavorite = (event) => {
    let newArray = [...favorites];
    favorites.forEach((item, i) => {
      if (event.target.id + "" === item.id + "") {
        if (item.thumbsDown !== null) {
          newArray[i].thumbsUp = null;
          setFavoritesList(newArray);
          localStorage.setItem("films", JSON.stringify(newArray));
        } else {
          newArray[i].thumbsUp = null;
          setFavoritesList(newArray);
          localStorage.setItem("films", JSON.stringify(newArray));
          return newArray;
        }
      }
    });
  };

  useEffect(() => {
    if (localStorage.getItem("films")) {
      const films = JSON.parse(localStorage.getItem("films"));
      setFavoritesList(films);
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h1 className="myFavorites">My Favorites</h1>
      <div className="favoritesListGrid">
        {favorites.map((favorite) => {
          return (
            favorite.thumbsUp !== null && (
              <FavoriteCard
                poster={favorite.poster_path}
                imgUrl={"https://image.tmdb.org/t/p/w400"}
                title={favorite.title}
                id={favorite.id}
                deleteFavorite={deleteFavorite}
              />
            )
          );
        })}
      </div>
    </div>
  );
}

export default Favorites;
