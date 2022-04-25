import './App.css';
import React, { useState } from 'react';

function App() {

  const [entry, setEntry] = useState('');


  const newEntry = () => {
    console.log(entry)
    // now I need to start working on implementing the api. 
  }



  return (
    <div>
      <h1>Mood Journal</h1>
      <textarea
        className="Journal-Entry"
        value={entry}
        type="text"
        onChange={(e) => setEntry(e.target.value)}
      />
      <div className="Testing"></div>
      <div>
        <button onClick={() => newEntry()}>Submit</button>
      </div>


    </div>
  );
}

export default App;
