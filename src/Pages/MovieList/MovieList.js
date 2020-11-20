import React from 'react';
import "./MovieList.css";
import MovieCard from '../../Components/MovieCard/MovieCard'

function MovieList({movies}) {



if (!movies) {
    return <div>Loading</div>
}
console.log(movies);


    // const moviesList = movies.results
    // console.log("helloMovie",moviesList)
    // console.log( moviesList.map(movie =>movie.title))
        
      
        
    
    return (
        <div>
            <h1> Movie List</h1>
            <div className="movieListGrid">
            {movies.map((movie)=> {
    return (
    <>
   <MovieCard
  poster={movie.poster_path}
  imgUrl={'https://image.tmdb.org/t/p/w400'}
  title={movie.title}
  date={movie.release_date}
  id={movie.id}/>
    
    </>
            )})}
</div>
        </div>
    );
}

export default MovieList;