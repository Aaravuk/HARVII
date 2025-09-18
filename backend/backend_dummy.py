from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd

app = FastAPI()

class SensorData(BaseModel):
    temp: float   # Temperature in °C
    hum: float    # Humidity in %
    soil: float   # Soil moisture in %

@app.post("/predict")
def predict(data: SensorData):
    # Mock liters needed
    liters = round((100 - data.soil) * 0.1, 2)

    # Adjust irrigation time based on soil moisture
    irrigation_time = "6 hours" if data.soil < 30 else "2 hours"

    # Simple crop suggestion
    crop = "Wheat" if data.temp < 25 else "Rice"

    # Mock weather condition
    weather = "Sunny with mild humidity"

    return {
        "liters": liters,
        "time": irrigation_time,
        "crop": crop,
        "weather": weather
    }
