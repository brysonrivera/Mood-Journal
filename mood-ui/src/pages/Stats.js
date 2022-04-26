import React from 'react';
import NavBar from '../components/NavBar';

function Stats() {
    return (
        <div>
            <NavBar />
            <h1>Stats Page</h1>
            <button className="question-mark">&#x3F;</button>
            <img
                id='scatter'
                src="https://r-graph-gallery.com/img/graph/13-scatter-plot2.png"
                alt="scatterplot image">
            </img>

            <img
                src="https://cdn.education.com/files/526001_527000/526682/file_526682.png"
                alt="mood meter" />
            <button className="question-mark">&#x3F;</button>
        </div>
    )
}

export default Stats;