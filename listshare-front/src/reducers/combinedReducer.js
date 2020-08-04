import {combineReducers} from 'redux';
import userReducer from './userReducer/userReducer';

const combinedReducer = combineReducers({
    "logged_in": userReducer
});

export default combinedReducer;