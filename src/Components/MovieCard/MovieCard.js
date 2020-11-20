import React from 'react';
import { Link} from "react-router-dom";
import NoPicture from "./No_Picture.jpg";

function MovieList({title,id,poster,imgUrl}) {
    return (
        <div>
            <Link to={"/Movie/" + id}>
    <div>{title}</div>
    <img 
    src={poster ? imgUrl + poster: NoPicture}
		alt={title}
		key={id}
	/>
            </Link>
        </div>
    );
}

export default MovieList;
