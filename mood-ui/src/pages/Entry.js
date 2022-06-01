import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'

function Entry({ setEntry, entry, email }) {

    const [count, setCount] = useState(0);
    const { validUser } = useAuth();

    let navigate = useNavigate();

    useEffect(() => {
        setCount(entry.length)

    }, [entry])


    return (
        <div className='Entry'>
            <NavBar setEntry={setEntry} />
            <h1>Mood Journal</h1>
            <div className="alert alert-dark alert-dismissible fade show" role="alert">
                <strong>New Feature: </strong>  Please enter your current mood and get a prize.
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <p>How is your day going?</p>

            <div className='user-input'>
                <textarea
                    className="Journal-Entry form-control"
                    value={entry}
                    type="text"
                    onChange={(e) => {
                        setEntry(e.target.value);
                    }}
                >
                </textarea>
                <div className='characters'>
                    <span>{count}/280</span>
                </div>
            </div>
            <div>
                <button className='btn btn-success' onClick={() => { navigate("/results") }}>Surprise</button>
                {!validUser.isAnonymous &&
                    <button className='btn btn-warning' onClick={() => {
                        const verified = window.confirm("This entry will only log your journal. It does not come with a prize. Are you sure you want to complete your submission?")
                        if (verified) alert("Entry Logged")
                        else alert("Entry was not logged. ")

                    }}>Log Entry</button>
                }

                {entry.length > 0 &&
                    <button type='button' className="btn btn-danger" onClick={() => setEntry("")}>Clear</button>

                }
            </div>
        </div>
    );
}

export default Entry;
