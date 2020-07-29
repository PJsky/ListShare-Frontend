import React from 'react';
import "./styles/style.css";
import MainPage from './components/MainPage';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <MainPage/>
      </div>
    </Router>
  );
}

export default App;
