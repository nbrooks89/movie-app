import React from "react";
import "./HomePage.css";
import SearchBar from "../../Components/SearchBar/SearchBar";
function HomePage({ setMovieList }) {
  return (
    <>
      <div className="homeContainer">
        <h1>Movie Dictionary</h1>
        <div>
          <SearchBar setMovieList={setMovieList} />
        </div>
      </div>
    </>
  );
}

export default HomePage;
