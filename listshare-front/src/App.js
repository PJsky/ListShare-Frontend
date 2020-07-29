import React from 'react';
import "./styles/style.css";
import MainPage from './components/MainPage';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route path="/" exact component={MainPage}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
