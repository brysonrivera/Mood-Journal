import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../config/firebase'
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInAnonymously,
    signOut
} from 'firebase/auth'

const AuthContext = React.createContext();


export function useAuth() {
    return useContext(AuthContext)
}


export function AuthProvider({ children }) {
    const [validUser, setValidUser] = useState();

    const signUp = (email, password) => {
        // returns a promise 
        // you can chain the response (.then()) to get the user Credentials
        // Please review https://firebase.google.com/docs/auth/web/start "Sign up new users for more info"
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logIn = (email, password) => {
        console.log(email)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        return signOut(auth)
    }

    const signUpAnonymously = () => {
        return signInAnonymously(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setValidUser(user)
        })
        return () => {
            unsubscribe();
        }
    }, [])

    const validation = {
        validUser,
        signUp,
        logIn,
        signUpAnonymously,
        logOut
    }

    return (
        <AuthContext.Provider value={validation} >
            {children}
        </AuthContext.Provider>
    )

} 