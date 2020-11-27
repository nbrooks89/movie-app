import React from "react";
import "./MovieList.css";
import MovieCard from "../../Components/MovieCard/MovieCard";
function MovieList({ movies }) {
  if (!movies) {
    return <div>Loading</div>;
  }

  return (
    <div className="movieListGrid">
      {movies.map((movie) => {
        return (
          <MovieCard
            poster={movie.poster_path}
            imgUrl={"https://image.tmdb.org/t/p/w400"}
            title={movie.title}
            date={movie.release_date}
            id={movie.id}
            director={movie.director}
          />
        );
      })}
    </div>
  );
}

export default MovieList;
