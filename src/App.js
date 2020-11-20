import React, {useState} from 'react'
import logo from './logo.svg';
import './App.css';
import HomePage from './Pages/HomePage/HomePage'

function App() {
  const [someState, setSomeState] = useState('hello')
  return (
    <div className="App">
  <HomePage someState={someState} />
    </div>
  );
}

export default App;
