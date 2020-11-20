import React from 'react';
import './HomePage.css';
import SearchBar from '../../Components/SearchBar/SearchBar'

function HomePage({someState}) {
    return (
        <div>
            {someState}
            <SearchBar />
        </div>
    );
}

export default HomePage;