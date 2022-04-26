import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav className="navbar">
            <ul className="nav-container">
                <li className='nav-item'><Link to="/"> Mood Journal</Link></li>
                <li className='nav-item'><Link to="/logs"> Logs</Link></li>
                <li className='nav-item'><Link to="/stats"> Stats</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;
