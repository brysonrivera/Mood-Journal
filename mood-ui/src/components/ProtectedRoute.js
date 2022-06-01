import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const { validUser } = useAuth();
    console.log(validUser)

    if (!validUser) {
        return <Navigate to='/login' />
    }

    return children
};