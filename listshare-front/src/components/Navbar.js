import React, { useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { user_log_out } from '../actions/userActions';


const Nav = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const logged = useSelector(state => state.logged_in);
    
    const getNav = () =>{
        if(!logged)return(
            <ul className="navigation-list">
                <li className="navigation-list-item">
                    <Link to ="/login">Login</Link>
                </li>
                <li className="navigation-list-item">
                    <Link to ="/register">Register</Link>
                </li>
            </ul>
        );
        else
        return(
            <ul className="navigation-list">
                <li className="navigation-list-item">
                    <Link to ="./login"
                    onClick={logOut}>Log Out</Link>
                </li>
            </ul>
        );
    }

    const logOut = () =>{
        console.log("abc")
        try{
            window.localStorage.removeItem("AccessToken");
        }catch{}
        dispatch(user_log_out());
        history.push('/login');
        
    }
    
    return(
        <>
            <div className="navbar-container">
                <div className="navbar-listshare">
                    <h1>
                        <Link to ="/">ListShare</Link>
                    </h1>
                </div>
                <nav className="navigation">
                    {getNav()}
                </nav>
            </div>
        </>
    )
}

export default Nav;
