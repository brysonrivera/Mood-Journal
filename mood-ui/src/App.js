import React, { useState } from 'react';
import "./App.css"
import Stats from "./pages/Stats"
import Logs from "./pages/Logs"
import Entry from './pages/Entry';
import Results from './pages/Results';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import {
  Routes,
  Route
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from './components/ProtectedRoute';


function App() {

  const [entry, setEntry] = useState("");
  const [email, setEmail] = useState("");

  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Entry setEntry={setEntry} entry={entry} email={email} />
            </ProtectedRoute>
          } />
        <Route
          path='/results'
          element={
            <ProtectedRoute>
              <Results entry={entry} />
            </ProtectedRoute>} />
        <Route
          path="/logs"
          element={
            <ProtectedRoute>
              <Logs />
            </ProtectedRoute>} />
        <Route
          path="/stats"
          element={
            <ProtectedRoute>
              <Stats />
            </ ProtectedRoute>} />
        <Route path="/login" element={<Login setEmail={setEmail} />} />
        <Route path="/signup" element={< SignUp />} />
      </Routes>

    </AuthProvider>

  )
}

export default App;
