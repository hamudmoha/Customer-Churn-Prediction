document.getElementById('customerForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Collect form data
    const formData = {
        gender: parseInt(document.querySelector('input[name="gender"]:checked').value),
        SeniorCitizen: parseInt(document.querySelector('input[name="SeniorCitizen"]:checked').value),
        Partner: parseInt(document.querySelector('input[name="Partner"]:checked').value),
        Dependents: parseInt(document.querySelector('input[name="Dependents"]:checked').value),
        tenure: parseFloat(document.getElementById('tenure').value),
        PhoneService: parseInt(document.querySelector('input[name="PhoneService"]:checked').value),
        MultipleLines: parseInt(document.querySelector('input[name="MultipleLines"]:checked').value),
        InternetService: parseInt(document.querySelector('input[name="InternetService"]:checked').value),
        OnlineSecurity: parseInt(document.querySelector('input[name="OnlineSecurity"]:checked').value),
        OnlineBackup: parseInt(document.querySelector('input[name="OnlineBackup"]:checked').value),
        DeviceProtection: parseInt(document.querySelector('input[name="DeviceProtection"]:checked').value),
        TechSupport: parseInt(document.querySelector('input[name="TechSupport"]:checked').value),
        StreamingTV: parseInt(document.querySelector('input[name="StreamingTV"]:checked').value),
        StreamingMovies: parseInt(document.querySelector('input[name="StreamingMovies"]:checked').value),
        Contract: parseInt(document.querySelector('input[name="Contract"]:checked').value),
        PaperlessBilling: parseInt(document.querySelector('input[name="PaperlessBilling"]:checked').value),
        PaymentMethod: parseInt(document.querySelector('input[name="PaymentMethod"]:checked').value),
        MonthlyCharges: parseFloat(document.getElementById('MonthlyCharges').value),
        TotalCharges: parseFloat(document.getElementById('TotalCharges').value)
    };

    try {
        // Send data to FastAPI endpoint
        const response = await fetch('http://127.0.0.1:8000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        const prediction = result.prediction;

        // Display result with animation
        const resultDiv = document.getElementById('result');
        resultDiv.textContent = `Prediction: ${prediction}`;
        resultDiv.className = prediction === "Churn" ? 'sad' : 'happy';

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').textContent = 'Error making prediction';
    }
});