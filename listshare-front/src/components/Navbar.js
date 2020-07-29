import React from 'react';


const Nav = () => {
    
    return(
        <>
            <div className="navbar-container">
                <div className="navbar-listshare">
                    <h1>ListShare</h1>
                </div>
                <nav className="navigation">
                    <ul className="navigation-list">
                        <li className="navigation-list-item">Login</li>
                        <li className="navigation-list-item">Register</li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Nav;
