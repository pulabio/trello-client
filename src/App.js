import React from 'react';
import './config'
import './App.css';
import FetchCards from "./components/FetchCards";

function App() {
  return (
    <div className="App">
        <h1>Lista de cards</h1>
        <FetchCards/>
    </div>
  );
}

export default App;
