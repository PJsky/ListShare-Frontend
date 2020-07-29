import React from 'react';
import {Link} from 'react-router-dom';


const Nav = () => {
    
    return(
        <>
            <div className="navbar-container">
                <div className="navbar-listshare">
                    <h1>
                        <Link to ="/">ListShare</Link>
                    </h1>
                </div>
                <nav className="navigation">
                    <ul className="navigation-list">
                        <li className="navigation-list-item">
                            <Link to ="/login">Login</Link>
                        </li>
                        <li className="navigation-list-item">
                            <Link to ="/register">Register</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Nav;
