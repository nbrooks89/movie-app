import React from 'react';
import './HomePage.css';
import SearchBar from '../../Components/SearchBar/SearchBar'

function HomePage({setMovies}) {
    return (
        <div>
          
            <SearchBar setMovies={setMovies} />
        </div>
    );
}

export default HomePage;