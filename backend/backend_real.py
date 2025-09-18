from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import requests
import pandas as pd

app = FastAPI()

class SensorData(BaseModel):
    temp: float
    hum: float
    soil: float

# Load models
water_model = joblib.load("backend/models/water_predictor.pkl")
crop_model = joblib.load("backend/models/crop_classifier.pkl")

@app.post("/predict")
def predict(data: SensorData):
    X = [[data.temp, data.hum, data.soil]]

    liters = water_model.predict(X)[0]
    irrigation_time = "2 hours" if data.soil < 30 else "6 hours"
    crop = crop_model.predict(X)[0]

    weather = requests.get(
        "https://api.weatherapi.com/v1/current.json",
        params={"q": "India", "key": "YOUR_WEATHER_API_KEY"}
    ).json()
    weather_text = weather["current"]["condition"]["text"]

    return {
        "liters": round(float(liters), 2),
        "time": irrigation_time,
        "crop": crop,
        "weather": weather_text
    }
