import React, { Children } from "react";
import "./NavBar.css";
import IosFilm from "react-ionicons/lib/IosFilm";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
function NavBar({ setMovies, children }) {
  return (
    <nav className="navContainer">
      <Link to="/">
        <IosFilm fontSize="55px" color="white" />
      </Link>
      <div>{children}</div>
    </nav>
  );
}

export default NavBar;
