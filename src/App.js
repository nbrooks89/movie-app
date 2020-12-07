import React, { useState } from "react";
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

  return (
    <div className="App">
      <NavBar setMovieList={setMovieList}>
        {window.location.pathname !== "/" && (
          <SearchBar setMovieList={setMovieList} />
        )}
      </NavBar>
      <Route
        exact
        path="/"
        render={() => <HomePage setMovieList={setMovieList} />}
      />

      <Route
        path="/MovieList"
        render={() => (
          <MovieList movies={movieList} setMovieList={setMovieList} />
        )}
      />
      <Route
        path="/Movie/:id"
        render={(routerProps) => (
          <MovieDetails
            match={routerProps.match}
            setMovies={setMovieList}
            setFavorites={setFavorites}
            favorites={favorites}
          />
        )}
      />
      <Route
        path="/favorites"
        render={() => (
          <Favorites setFavorites={setFavorites} favorites={favorites} />
        )}
      />
    </div>
  );
}

export default App;
