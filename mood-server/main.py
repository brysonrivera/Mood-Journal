# to run server type in uvicorn main:app --reload
from typing import Optional

from fastapi import Request, FastAPI

from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

import requests

import os

from dotenv import load_dotenv

load_dotenv()

my_api_key = os.getenv("API_KEY")

app = FastAPI()

origins = ["http://localhost:3000", "http://192.168.1.5:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class JournalEntry(BaseModel):
    entry: str


@app.post("/entry")
def blob_score(body: JournalEntry):
    analyzer = SentimentIntensityAnalyzer()
    sentiment = analyzer.polarity_scores(body.entry)
    return sentiment


@app.get("/gif")
def retrieve_gif(mood: str):
    payload = {
        "q": mood,
        "api_key": my_api_key,
        "lang": "en"
    }
    data = requests.get("https://api.giphy.com/v1/gifs/search", params=payload)
    gif = data.json()
    return gif
