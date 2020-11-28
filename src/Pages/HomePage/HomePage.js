import React from "react";
import "./HomePage.css";
import SearchBar from "../../Components/SearchBar/SearchBar";
function HomePage({ setMovies }) {
  return (
    <>
      <div className="homeContainer">
        <h1>Movie Dictionary</h1>
        <div>
          <SearchBar setMovies={setMovies} />
        </div>
      </div>
    </>
  );
}

export default HomePage;
