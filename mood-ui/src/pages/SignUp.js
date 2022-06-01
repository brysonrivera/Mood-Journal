import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'
import { Alert } from 'react-bootstrap'

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const [show, setShow] = useState(false);
    const { signUp } = useAuth();
    const navigate = useNavigate();

    const createNewUser = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords must match. Re-Enter Password")
            setShow(true);
            return
        }
        try {
            await signUp(email, password);
            navigate("/login");
        } catch (err) {
            setError(err.message)
            setShow(true)
            return
        }
    }

    return (
        <>
            <h1>Mood Journal</h1>
            <div className="outer-container">
                <div className="container">
                    <h2>Sign Up</h2>
                    {show &&
                        <Alert variant="danger" onClose={() => setShow(false)} dismissible>{error}</Alert>
                    }
                    <form onSubmit={e => createNewUser(e)}>
                        <label htmlFor='user-first-name' className="form-label">First Name</label>
                        <input
                            type='text'
                            className='user-first-name form-control'
                            placeholder="Enter Your First Name"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            required
                        />
                        <label htmlFor='user-last-name' className="form-label">Last Name</label>
                        <input
                            type='text'
                            className='user-last-name form-control'
                            placeholder="Enter Your Last Name"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            required
                        />
                        <label htmlFor='user-email' className="form-label">Email</label>
                        <input
                            type='email'
                            className='user-email form-control'
                            placeholder="name@example.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />

                        <label htmlFor='user-password' className="form-label">Password</label>
                        <input
                            type='password'
                            className='form-control'
                            id="user-password"
                            placeholder="Create a Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            autoComplete="on"
                            required
                        />
                        <label htmlFor='user-confirm-password' className="form-label">Password</label>
                        <input
                            type='password'
                            className='form-control'
                            placeholder="Re-Enter Your Password"
                            id="user-confirm-password"
                            value={confirmPassword}
                            autoComplete="on"
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                        />
                        <input type='submit' className="btn btn-primary" />
                        <p>Have an Account? <Link to='/login'>Log In</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}