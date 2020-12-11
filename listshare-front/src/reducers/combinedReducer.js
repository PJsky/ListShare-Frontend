import {combineReducers} from 'redux';
import userReducer from './userReducer/userReducer';
import listHubReducer from './listHubReducer/listHubReducer';

const combinedReducer = combineReducers({
    "logged_in": userReducer,
    "listHub": listHubReducer
});

export default combinedReducer;