import React from "react";
import "./MovieList.css";
import MovieCard from "../../Components/MovieCard/MovieCard";
function MovieList({ movies }) {
  return (
    <>
      {movies.length < 1 ? (
        <h1 className="noMovie"> Sry No Movies with that title</h1>
      ) : (
        <div className="movieListGrid">
          {movies.map((movie) => {
            return (
              <MovieCard
                poster={movie.poster_path}
                imgUrl={"https://image.tmdb.org/t/p/w400"}
                title={movie.title}
                date={movie.release_date}
                id={movie.id}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export default MovieList;
