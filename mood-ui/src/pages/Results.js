import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { MdKeyboardReturn } from "react-icons/md";
import { Positive, Neutral, Negative } from '../synonyms/synonyms'
import { useAuth } from '../context/AuthContext'

function Results({ entry, email }) {
    const [gifCount, setGifCount] = useState(0);
    const [quoteCount, setQuoteCount] = useState(0);
    const [gifArray, setGifArray] = useState([]);
    const [gif, setGif] = useState("");
    const [quoteArray, setQuoteArray] = useState([])
    const [quote, setQuote] = useState("");
    const [sentiment, setSentiment] = useState(0);
    const [mood, setMood] = useState("");
    const validUser = useAuth();


    const navigate = useNavigate();

    const moodIdentifier = sentiment_data => {
        const getRandomInt = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        let mood = "";
        let max;
        if (sentiment_data >= 0.05) {
            mood = Positive
            max = Positive.length - 1

        }
        else if (sentiment_data <= -0.05) {
            mood = Negative
            max = Negative.length - 1
        }
        else {
            mood = Neutral
            max = Neutral.length - 1
        }
        const index = getRandomInt(0, max)
        const synonym = mood[index]
        return synonym
    }
    const sentimentScore = async entry => {
        try {
            const response = await fetch("http://127.0.0.1:8000/entry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "entry": entry
                }),
            })
            const data = await response.json();
            const sentiment_data = data.compound
            return sentiment_data

        } catch (err) {
            console.log(err)
        }
    }

    const fetchGIF = async mood_data => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/gif?mood=${mood_data}`)
            const gif = await response.json()
            setGifArray([...gif.data])
            return gif.data
        } catch (error) {
            console.log(error)
        }
    }

    const fetchQuote = async mood_data => {
        try {
            if (quoteCount === quoteArray.length) {
                const response = await fetch(`http://127.0.0.1:8000/quote?mood=${mood_data}`)
                const quote = await response.json()
                setQuoteArray([...quoteArray, quote.Quote])
                setQuoteCount(quoteCount + 1)
            } else {
                setQuoteCount(quoteCount + 1)
            }
            return

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (gifArray.length > 0) {
            setGif(gifArray[gifCount].images.downsized.url)
        }
    }, [gifCount])


    useEffect(() => {
        setQuote(quoteArray[quoteCount - 1])

    }, [quoteCount])



    useEffect(() => {

        const retrieveData = async entry => {
            const sentiment_data = await sentimentScore(entry);
            setSentiment(sentiment_data)

            const mood_data = moodIdentifier(sentiment_data);
            setMood(mood_data)

            const gifData = await fetchGIF(mood_data);
            setGif(gifData[gifCount].images.downsized.url)

            await fetchQuote(mood_data)
        }

        retrieveData(entry)

    }, [])

    return (
        <div>
            <button className='btn btn-primary' onClick={() => navigate(-1)}><MdKeyboardReturn /></button>
            <h1>Results</h1>
            {!validUser.validUser.isAnonymous &&
                <div className='d-grid gap-2'>
                    <button className='btn btn-success' type='button'> Log</button>
                </div>
            }

            <div className="results-container">
                <div className="results-item">
                    {gifArray.length > 0 &&
                        <>
                            <h2>Gif</h2>
                            <img src={gif}></img>
                            <br />
                            <button className='btn btn-light' onClick={() => setGifCount(gifCount => gifCount + 1)}>New Gif</button>
                        </>
                    }
                    {gifCount > 0 &&
                        <>
                            <button className='btn btn-light' onClick={() => setGifCount(gifCount => gifCount - 1)}>Back</button>
                        </>
                    }
                </div>
                <div className="results-item">
                    {quoteArray.length > 0 &&
                        <>
                            <h2>Quote</h2>
                            <p>{quote}</p>
                            <button className='btn btn-light' onClick={() => fetchQuote(mood)}>New Quote</button>

                        </>
                    }
                    {quoteCount > 1 &&
                        <>
                            <button className='btn btn-light' onClick={() => setQuoteCount(quoteCount - 1)}>Back</button>
                        </>
                    }
                </div>
            </div>

        </div>

    )
}

export default Results;
