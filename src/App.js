import React, { useState } from "react";
import { Route, withRouter } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar/NavBar";

import HomePage from "./Pages/HomePage/HomePage";
import MovieList from "./Pages/MovieList/MovieList";
import SearchBar from "./Components/SearchBar/SearchBar";
import MovieDetails from "./Pages/MovieDetails/MovieDetails";
function App() {
  const [movieList, setMovieList] = useState([]);
  // const [favorites, setFavorites] = useState([]);

  const setMovies = (results) => {
    setMovieList(results);
  };

  // const setFavoriteList = (favorite) => {
  //   setFavorites(favorite);

  // };
  console.log(window.location);
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
          <MovieDetails match={routerProps.match} setMovies={setMovies} />
        )}
      />
    </div>
  );
}

export default withRouter(App);
