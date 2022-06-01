/*
import React from "react";
import ReactDOM from "react-dom";
import App from "./App"
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(< App />);

*/

//For now leave StricMode out, because StrictMode 
// renders components twice (on dev but not production) 
// in order to detect any problems with your code and warn 
// you about them (which can be quite useful).

/*import { StrictMode } from 'react'; */
import { BrowserRouter as Router } from 'react-router-dom';

// ✅ now importing from react-dom/client
import { createRoot } from 'react-dom/client';

import App from './App';

// 👇️ IMPORTANT: make sure to specify correct ID
// must be the ID of the div element in your index.html file
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <Router>
        <App />
    </Router>,
);