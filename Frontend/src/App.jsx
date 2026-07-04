import { useState } from "react";
import { FaHome, FaBed, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

function App() {
  const [formData, setFormData] = useState({
    Area: "",
    Bedrooms: "",
    Age: "",
    Distance_to_City: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const predictPrice = async () => {
    // Validation
    if (
      !formData.Area ||
      !formData.Bedrooms ||
      !formData.Age ||
      !formData.Distance_to_City
    ) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setPrediction(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Area: Number(formData.Area),
          Bedrooms: Number(formData.Bedrooms),
          Age: Number(formData.Age),
          Distance_to_City: Number(formData.Distance_to_City),
        }),
      });

      const data = await response.json();
      setPrediction(data.predicted_price);
    } catch (error) {
      alert("Failed to connect to the backend.");
      console.error(error);
    }

    setLoading(false);
  };

  const inputStyle =
    "w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition";

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-gray-900 flex items-center justify-center px-4">

      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-blue-600 rounded-full blur-[140px] opacity-20"></div>

      <div className="relative w-full max-w-xl bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-3xl shadow-2xl p-8">

        <div className="text-center">

          <h1 className="text-4xl font-bold text-white">
            🏠 House Price Predictor
          </h1>

          <p className="text-gray-400 mt-3">
            Estimate house prices using Machine Learning
          </p>

        </div>

        <div className="mt-8 space-y-5">

          <div>
            <label className="text-gray-300 mb-2 flex items-center gap-2">
              <FaHome />
              Area (sq ft)
            </label>

            <input
              type="number"
              name="Area"
              placeholder="e.g. 1750"
              className={inputStyle}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-gray-300 mb-2 flex items-center gap-2">
              <FaBed />
              Bedrooms
            </label>

            <input
              type="number"
              name="Bedrooms"
              placeholder="e.g. 4"
              className={inputStyle}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-gray-300 mb-2 flex items-center gap-2">
              <FaCalendarAlt />
              House Age
            </label>

            <input
              type="number"
              name="Age"
              placeholder="e.g. 5"
              className={inputStyle}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-gray-300 mb-2 flex items-center gap-2">
              <FaMapMarkerAlt />
              Distance to City (km)
            </label>

            <input
              type="number"
              name="Distance_to_City"
              placeholder="e.g. 2"
              className={inputStyle}
              onChange={handleChange}
            />
          </div>

          <button
            onClick={predictPrice}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-xl py-4 text-white text-lg font-bold shadow-lg hover:scale-[1.02] disabled:bg-blue-400"
          >
            {loading ? "Predicting..." : "🚀 Predict Price"}
          </button>

        </div>

        {prediction && (
          <div className="mt-8 bg-green-600 rounded-2xl p-6 text-center animate-pulse">

            <p className="text-white text-lg">
              Estimated House Price
            </p>

            <h2 className="text-4xl font-bold text-white mt-2">
              रु{prediction.toLocaleString()}
            </h2>

            <p className="text-green-100 mt-2">
              ✅ Prediction completed successfully
            </p>

          </div>
        )}

        <div className="mt-8 text-center text-gray-500 text-sm">
          Built with ❤️ using React • Django • Scikit-Learn
        </div>

      </div>
    </div>
  );
}

export default App;