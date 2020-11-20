import React, { useState } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import MovieList from "./Pages/MovieList/MovieList";
// import SearchBar from './Components/SearchBar/SearchBar'
import MovieDetails from "./Pages/MovieDetails/MovieDetails";
function App() {
  const [movieList, setMovieList] = useState([]);

  const setMovies = (results) => {
    setMovieList(results);
    // this.props.history.push('/searchresults');
  };
  // const getUserInput = (input) => {
  // 	setUserInput( input );
  // 	// this.props.history.push('/searchresults');
  // };

  return (
    <div className="App">
      {/* <SearchBar setMovies={setMovies}/> */}

      <Route exact path="/" render={() => <HomePage setMovies={setMovies} />} />

      <Route
        path="/MovieList"
        render={() => <MovieList movies={movieList} />}
      />
      <Route
        path="/Movie/:id"
        render={(routerProps) => <MovieDetails match={routerProps.match} />}
      />
    </div>
  );
}

export default App;
