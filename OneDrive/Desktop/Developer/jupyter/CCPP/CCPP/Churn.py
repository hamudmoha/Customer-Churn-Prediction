from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
import numpy as np
from sklearn.preprocessing import StandardScaler

# Load the trained model and scaler
model = joblib.load('best_model.pkl')
scaler = joblib.load('scaler.pkl')  # Save and load the scaler from training

# Initialize FastAPI app
app = FastAPI()

# Define input data schema
class CustomerData(BaseModel):
    gender: int
    SeniorCitizen: int
    Partner: int
    Dependents: int
    tenure: float
    PhoneService: int
    MultipleLines: int
    InternetService: int
    OnlineSecurity: int
    OnlineBackup: int
    DeviceProtection: int
    TechSupport: int
    StreamingTV: int
    StreamingMovies: int
    Contract: int
    PaperlessBilling: int
    PaymentMethod: int
    MonthlyCharges: float
    TotalCharges: float

# Define prediction endpoint
@app.post("/predict")
def predict(data: CustomerData):
    # Convert input data to DataFrame
    input_data = pd.DataFrame([data.dict()])
    
    # Apply scaling
    input_data_scaled = scaler.transform(input_data)
    
    # Make prediction
    prediction = model.predict(input_data_scaled)
    
    # Convert numeric prediction to label
    prediction_label = "Churn" if prediction[0] == 1 else "Stay"
    
    # Return prediction
    return {"prediction": prediction_label}

# For testing locally
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)