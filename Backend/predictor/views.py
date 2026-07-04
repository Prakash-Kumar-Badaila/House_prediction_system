import os
import joblib
import pandas as pd

from rest_framework.decorators import api_view
from rest_framework.response import Response

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "house_price_model.pkl")

model = joblib.load(MODEL_PATH)


@api_view(["POST"])
def predict_price(request):

    data = request.data

    new_house = pd.DataFrame({
        "Area": [data["Area"]],
        "Bedrooms": [data["Bedrooms"]],
        "Age": [data["Age"]],
        "Distance_to_City": [data["Distance_to_City"]]
    })

    prediction = model.predict(new_house)

    return Response({
        "predicted_price": round(float(prediction[0]), 2)
    })