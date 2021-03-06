import React, { useState } from "react";
import { Redirect, withRouter } from "react-router-dom";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ setMovieList, history }) {
  const [userInput, setUserInput] = useState("");

  const handleChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleGetRequest(userInput);
    setUserInput("");
    history.push("/MovieList");

    // getUserInput(userInput);
  };
  const handleGetRequest = (searchInput) => {
    const key = process.env.REACT_APP_MOVIE_API_KEY;

    const success = (res) => (res.ok ? res.json() : Promise.resolve({}));

    const page1 = fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchInput}&page=1`
    ).then(success);
    const page2 = fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchInput}&page=2`
    ).then(success);
    const page3 = fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchInput}&page=3`
    ).then(success);

    return Promise.all([page1, page2, page3]).then(([page1, page2, page3]) => {
      let results = page1.results.concat(page2.results);
      results = results.concat(page3.results);
      setMovieList(results);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="searchContainer"
          value={userInput}
          onChange={handleChange}
          required
        />
        <button className="searchButton" type="submit">
          <div className="searchIcon">
            <FontAwesomeIcon icon={faSearch} color="rgb(29, 122, 165)" />
          </div>
        </button>
      </form>
    </div>
  );
}

export default withRouter(SearchBar);
