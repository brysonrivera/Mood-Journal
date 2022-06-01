import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'

function NavBar({ setEntry }) {
    const { validUser, logOut } = useAuth();

    const logOutHandler = async (e) => {
        e.preventDefault();
        try {
            setEntry("");
            await logOut();
        } catch (err) {
            console.log(err)

        }
    }


    /*
    I need to implement something that will conditionally render the Login/SignUp page when the user is currently
    in the Dashboard as a guest. When a user is logged in, they should not be shown the Login/SignUp page anymore.

    */
    return (
        <nav className="navbar navbar-expand-lg">
            <div className='container-fluid'>
                <Link className='navbar-brand' to="/"> Mood Journal</Link>
                <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {!validUser.isAnonymous &&
                            <li className='nav-item'>
                                <Link className='nav-link' to="/logs"> Logs</Link>
                            </li>
                        }
                        {!validUser.isAnonymous &&
                            <li className='nav-item'>
                                <Link className='nav-link' to="/stats"> Stats</Link>
                            </li>
                        }






                    </ul>
                    <ul className='navbar-nav ml-auto'>

                        <li className='nav-item'>
                            <a href='#' className='nav-link' onClick={(e) => logOutHandler(e)}>Log Out</a>
                        </li>
                        {validUser.isAnonymous &&
                            <li className='nav-item'>
                                <Link className='nav-link' to='/signup'>Sign Up</Link>
                            </li>
                        }
                    </ul>
                </div>

            </div>

        </nav>
    );
}

export default NavBar;
