import React from "react";
import "./NavBar.css";
import IosFilm from "react-ionicons/lib/IosFilm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
function NavBar({ children }) {
  return (
    <nav className="navContainer">
      <div className="icon">
        <Link to="/">
          <IosFilm fontSize="55px" color="white" />
        </Link>
      </div>
      <div className="favSearch">
        <Link className="favorite" to="/favorites">
          Favorites
        </Link>
        <Link className="favoriteIcon" to="/favorites">
          <FontAwesomeIcon icon={faThumbsUp} size="2x" color="white" />
        </Link>
        <div>{children}</div>
      </div>
    </nav>
  );
}

export default NavBar;
