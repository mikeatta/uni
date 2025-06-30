"use server";

export async function getModelPrediction(form: FormData) {
  const modelPredictionsEndpointUrl = "http://backend:5000/predict";

  // Extract submitted form data
  const payload = {
    age: form.get("age"),
    workclass: form.get("workclass"),
    relationship: form.get("relationship"),
    occupation: form.get("occupation"),
    education: form.get("education"),
    hours_per_week: form.get("hours_per_week"),
    marital_status: form.get("marital_status"),
    capital_gain: form.get("capital_gain"),
    capital_loss: form.get("capital_loss"),
    sex: form.get("sex"),
  };

  // Configure the request params
  const config: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };
  // Send the data to the prediction endpoint
  const response = await fetch(modelPredictionsEndpointUrl, config);

  if (!response.ok) {
    throw new Error(
      "Failed to get the model predictions. Service endpoint responded with an error"
    );
  }

  const data = await response.json();
  const modelPrediction = data.prediction as number;

  return modelPrediction;
}
