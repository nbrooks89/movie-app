import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar/NavBar";

import HomePage from "./Pages/HomePage/HomePage";
import MovieList from "./Pages/MovieList/MovieList";
import SearchBar from "./Components/SearchBar/SearchBar";
import MovieDetails from "./Pages/MovieDetails/MovieDetails";
import Favorites from "./Pages/Favorites/Favorites";
function App() {
  const [movieList, setMovieList] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const setMovies = (results) => {
    setMovieList(results);
  };

  const setFavoritesList = (favorite) => {
    setFavorites(favorite);
  };

  return (
    <div className="App">
      <NavBar setMovies={setMovies}>
        {window.location.pathname !== "/" && (
          <SearchBar setMovies={setMovies} />
        )}
      </NavBar>
      <Route exact path="/" render={() => <HomePage setMovies={setMovies} />} />

      <Route
        path="/MovieList"
        render={() => <MovieList movies={movieList} setMovies={setMovies} />}
      />
      <Route
        path="/Movie/:id"
        render={(routerProps) => (
          <MovieDetails
            match={routerProps.match}
            setMovies={setMovies}
            setFavoritesList={setFavoritesList}
            favorites={favorites}
          />
        )}
      />
      <Route
        path="/favorites"
        render={() => (
          <Favorites
            setFavoritesList={setFavoritesList}
            favorites={favorites}
          />
        )}
      />
    </div>
  );
}

export default App;
