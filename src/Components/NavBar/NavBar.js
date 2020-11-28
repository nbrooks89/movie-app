import React from "react";
import "./NavBar.css";
import IosFilm from "react-ionicons/lib/IosFilm";
import { Link } from "react-router-dom";
function NavBar({ setMovies, children }) {
  return (
    <nav className="navContainer">
      <div className="icon">
        <Link to="/">
          <IosFilm fontSize="55px" color="white" />
        </Link>
      </div>
      <div className="favSearch">
        <Link to="/favorites">Favorites</Link>
        <div>{children}</div>
      </div>
    </nav>
  );
}

export default NavBar;
