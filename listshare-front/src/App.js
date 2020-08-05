import React, { useEffect } from 'react';
import "./styles/style.css";
import MainPage from './components/MainPage';
import Login from './components/Login';
import Register from './components/Register';
import ItemList from './components/ItemList';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { useDispatch } from 'react-redux';

global.BACKEND = "https://localhost:44301"
//global.BACKEND = "https://listshare-pjsky.herokuapp.com"


const App = () => {

  const dispatch = useDispatch();

  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route path="/" exact component={MainPage}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
          <Route path="/:listCode" exact component={ItemList}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
