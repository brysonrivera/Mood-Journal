import './App.css';
import React, { useState } from 'react';
import NavBar from './components/NavBar';

function App() {

  const [entry, setEntry] = useState('');
  const [pastEntry, setPastEntry] = useState('');
  const [gifCount, setGifCount] = useState(0);
  const [gifArray, setGifArray] = useState([]);

  const moodIdentifier = sentiment => {
    let mood = ""
    if (sentiment >= 0.05) mood = "Positive"
    else if (sentiment <= -0.05) mood = "Negative"
    else mood = "Neutral"
    return mood
  }

  const insertGif = () => {
    const gifContainer = document.getElementById("Gif")
    if (gifContainer.children.length > 0) {
      gifContainer.removeChild(gifContainer.firstChild)
    }
    const image = document.createElement("img")
    image.src = gifArray[gifCount].images.downsized.url
    image.alt = gifArray[gifCount].title
    gifContainer.appendChild(image)
  }

  const generateGIF = async (e, mood) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:8000/gif?mood=${mood}`)
      .then(response => response.json())
      .then(gif => {
        setGifArray(gif.data)
      })
      .then(() => {
        console.log(Array.isArray(gifArray))
        console.log(gifArray)
        insertGif()
        setGifCount(gifCount + 1)
      })
      .catch(error => console.log(error))
  }

  const retrieveMoodScore = async e => {
    const response = await fetch("http://127.0.0.1:8000/entry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "entry": entry
      }),
    });
    const data = await response.json();
    const sentiment = data.compound;
    const mood = moodIdentifier(sentiment);
    if (gifCount === 0) {
      generateGIF(e, mood);
    } else if (gifCount === gifArray.length - 1) {
      setGifCount(0)
      insertGif()
    } else {
      insertGif()
      setGifCount(gifCount + 1)
    }

  }
  const moodAnalyzer = e => {
    e.preventDefault();
    // if entries are the same, the user just want a new gif for the same submission
    if (entry === pastEntry) {
      console.log("one")
      insertGif()
      setGifCount(gifCount + 1)
      // if entries are different we need to get a new score to reflect their current submission
    } else {
      console.log("two")
      retrieveMoodScore(e)
    }
    // Helps us check when the user changes their submission changes from previous submissions.
    setPastEntry(entry)
  }

  return (
    <div>
      <NavBar />
      <h1>Mood Journal</h1>
      <p>New Feature: Please enter a your current mood and get a &#127873;.</p>
      <textarea
        className="Journal-Entry"
        value={entry}
        type="text"
        onChange={(e) => setEntry(e.target.value)}
      >
      </textarea>
      <div id="Gif">

      </div>

      <div>
        <button onClick={e => moodAnalyzer(e)}>Submit</button>
        <button onClick={() => alert("entry logged!")}>Log Entry</button>
      </div>
    </div>
  );
}

export default App;
