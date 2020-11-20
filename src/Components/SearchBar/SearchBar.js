import React, {useState,useEffect} from 'react';
import { Redirect } from "react-router-dom";
import './SearchBar.css';

function SearchBar({setMovies, getUserInput}) {
    const [userInput, setUserInput] = useState("")
    const [clickSubmit, setClickSubmit] = useState(false)

    const handleChange = (event) => {
		setUserInput( event.target.value);
    };
    
    const handleSubmit = (event) => {
		event.preventDefault();
		handleGetRequest(userInput);
        setClickSubmit(true)
        event.target.reset();
		// getUserInput(userInput);
	};
    const handleGetRequest = (searchInput) => {
        const key = process.env.REACT_APP_MOVIE_API_KEY;

        const success = res => res.ok ? res.json() : Promise.resolve({});

        const page1 = fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchInput}&page=1`).then(success);
         const page2 = fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchInput}&page=2`).then(success);
         const page3 = fetch(
                    `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchInput}&page=3`).then(success);
                
            return Promise.all([page1, page2, page3]).then(([page1, page2, page3]) => {
                let results = page1.results.concat(page2.results);
                results = results.concat(page3.results);
                setMovies(results)
            })
           
        };
        
    useEffect(()=>{
           console.log(clickSubmit)
        })
        if (clickSubmit === true) {
            return <Redirect to="/MovieList" />;
          }
        return (
            <div>
                <form onSubmit={handleSubmit} >
            <input value={userInput}onChange={handleChange}/>
            <button type='submit'>
						{' '}
						<div>SEARCH</div>
					</button>
            </form>
        </div>
    );
}

export default SearchBar;