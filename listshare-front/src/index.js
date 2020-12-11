import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore, applyMiddleware, compose} from 'redux';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import * as serviceWorker from './serviceWorker';
import combinedReducer from './reducers/combinedReducer';
import {websocketMiddleware} from './middleware/websocketMiddleware';


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [thunk, websocketMiddleware];

const store = createStore(
  combinedReducer,
  composeEnhancer(applyMiddleware(...middlewares)),
  );

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
