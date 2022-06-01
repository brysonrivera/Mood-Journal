import React, { useState, useEffect } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'
import { Alert } from "react-bootstrap";


export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");
    const [show, setShow] = useState(false);
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();
    const { logIn, signUpAnonymously } = useAuth();

    const verifyUser = async (e) => {
        e.preventDefault();
        try {
            await logIn(email, password)
            navigate("/")
        } catch (err) {
            setError(err.message)
            setShow(true)
        }
    }

    const anonymousUserHandler = async (e) => {
        e.preventDefault()
        try {
            await signUpAnonymously()
            navigate("/")
        } catch (err) {
            setError(err.message)
            setShow(true)

        }
    }

    useEffect(() => {
        const passwordObject = document.getElementById("user-password")
        if (toggle) passwordObject.type = "text"
        else passwordObject.type = "password"

    }, [toggle])



    return (
        <>
            <h1>Mood Journal</h1>
            <div className="outer-container">
                <div className="container">
                    <div>
                        <form onSubmit={e => verifyUser(e)}>
                            <h2>Login</h2>
                            {show &&
                                <Alert
                                    variant="danger"
                                    dismissible
                                    onClose={() => setShow(false)}
                                >
                                    {error}
                                </Alert>
                            }
                            <label htmlFor='user-email' className="form-label">Email</label>
                            <input
                                type='email'
                                className='user-email form-control'
                                placeholder="name@example.com"
                                value={email}
                                onChange={e => {
                                    setEmail(e.target.value)
                                }}
                            />
                            <label htmlFor='user-password' className="form-label">Password</label>
                            <input
                                type='password'
                                className='form-control'
                                id="user-password"
                                value={password}
                                onChange={e => {
                                    setPassword(e.target.value)
                                }}
                                autoComplete="on"
                            />

                            <p className="open-eye">{toggle ? <FaEyeSlash onClick={() => setToggle(!toggle)} /> : <FaEye onClick={() => setToggle(!toggle)} />}</p>
                            <span id='forgot-password'>Forgot Password</span>
                            <br />
                            <input type='submit' className="btn btn-primary" />
                            <p>Need an Account? <Link to='/signup'>SignUp</Link></p>
                            <button
                                type='button'
                                className="btn btn-secondary btn-lg"
                                onClick={e => anonymousUserHandler(e)}>
                                Continue as Guest
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </>

    )
}

