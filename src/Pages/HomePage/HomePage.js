import React from "react";
import "./HomePage.css";
import SearchBar from "../../Components/SearchBar/SearchBar";
function HomePage({ setMovies }) {
  return (
    <div className="homeContainer">
      <h1>Movie Dictionary</h1>
      <SearchBar setMovies={setMovies} />
    </div>
  );
}

export default HomePage;
