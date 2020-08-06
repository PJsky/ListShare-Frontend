import React, { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { user_log_out } from '../actions/userActions';
import { FaBars } from 'react-icons/fa';


const Nav = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const logged = useSelector(state => state.logged_in);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const getNav = () =>{
        if(!logged)return(
            <>
            <ul className="navigation-list">
                <li className="navigation-list-item">
                    <Link to ="/login">Login</Link>
                </li>
                <li className="navigation-list-item">
                    <Link to ="/register">Register</Link>
                </li>
            </ul>
            <ul className="navigation-list-dropdown">
                <li className="navigation-list-dropdown-trigger"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <FaBars/>
                </li>
            </ul>
            </>
        );
        else
        return(
            <>
            <ul className="navigation-list">
                <li className="navigation-list-item">
                    <Link to ="./login"
                    onClick={logOut}>Log Out</Link>
                </li>
            </ul>
            <ul className="navigation-list-dropdown">
                <li className="navigation-list-dropdown-trigger"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <FaBars/>
                </li>
            </ul>
            </>
        );
    }

    const getDropdownNav = () => {
        if(!logged) return(
            <>
            <Link to ="/login"><div className="navigation-dropdown-item">Login</div></Link>
            <Link to ="/register"><div className="navigation-dropdown-item">Register</div></Link>
            </>
        )
        else if(logged) return(
            <>
                <Link to ="/login" onClick={logOut}><div className="navigation-dropdown-item">Log Out</div></Link>
            </>
        )
    }

    const logOut = () =>{
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
                <nav className={isDropdownOpen?"navigation-dropdown":"hidden-class"}>
                    {getDropdownNav()}
                </nav>
            </div>
        </>
    )
}

export default Nav;
