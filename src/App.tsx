import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div id="title-bar">
          <div id="title-bar-drag-region"></div>
          <div id="title-bar-buttons">
              <button id="minimize-btn">_</button>
              <button id="maximize-btn">[ ]</button>
              <button id="close-btn">X</button>
          </div>
      </div>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}


export default App;
