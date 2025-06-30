"use client";

import { useState } from "react";
import { getModelPrediction } from "./actions/serverActions";

export default function Home() {
  const [modelPreds, setModelPreds] = useState<number | null>(null);

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Do not refresh the page on form submit
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const result = await getModelPrediction(formData);

    // Skip the '0' check since it's a valid returnable value
    if (result === null || result === undefined) {
      throw new Error(
        "Error while receiving model prediction in the form component."
      );
    }

    // Set the model prediction value
    setModelPreds(result);
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <main className="flex flex-col items-center justify-center w-full">
        <h1 className="mt-8 my-4 text-2xl font-bold text-black">
          Income Prediction
        </h1>
        <form
          onSubmit={handleFormSubmit}
          className="w-full max-w-md flex flex-col gap-4 bg-white m-8 p-8 rounded-lg shadow-lg text-black"
        >
          {/* Age field */}
          <label htmlFor="age" className="text-black">
            Age
          </label>
          <input
            type="number"
            name="age"
            id="age"
            className="border-2 border-slate-900 p-2 text-black"
          />

          {/* Workclass field */}
          <label htmlFor="workclass" className="text-black">
            Workclass
          </label>
          <select
            name="workclass"
            id="workclass"
            className="border-2 border-slate-900 p-2 text-black"
          >
            <option value="Private">Private</option>
            <option value="State-gov">State-gov</option>
            <option value="Federal-gov">Federal-gov</option>
            <option value="Self-emp-not-inc">Self-emp-not-inc</option>
            <option value="Self-emp-inc">Self-emp-inc</option>
            <option value="Local-gov">Local-gov</option>
            <option value="Without-pay">Without-pay</option>
          </select>

          {/* Relationship field */}
          <label htmlFor="relationship" className="text-black">
            Relationship
          </label>
          <select
            name="relationship"
            id="relationship"
            className="border-2 border-slate-900 p-2 text-black"
          >
            <option value="Not-in-family">Not-in-family</option>
            <option value="Unmarried">Unmarried</option>
            <option value="Own-child">Own-child</option>
            <option value="Other-relative">Other-relative</option>
            <option value="Husband">Husband</option>
            <option value="Wife">Wife</option>
          </select>

          {/* Occupation field */}
          <label htmlFor="occupation" className="text-black">
            Occupation
          </label>
          <select
            name="occupation"
            id="occupation"
            className="border-2 border-slate-900 p-2 text-black"
          >
            <option value="Exec-managerial">Exec-managerial</option>
            <option value="Machine-op-inspct">Machine-op-inspct</option>
            <option value="Prof-specialty">Prof-specialty</option>
            <option value="Other-service">Other-service</option>
            <option value="Adm-clerical">Adm-clerical</option>
            <option value="Transport-moving">Transport-moving</option>
            <option value="Sales">Sales</option>
            <option value="Craft-repair">Craft-repair</option>
            <option value="Farming-fishing">Farming-fishing</option>
            <option value="Tech-support">Tech-support</option>
            <option value="Protective-serv">Protective-serv</option>
            <option value="Handlers-cleaners">Handlers-cleaners</option>
            <option value="Armed-Forces">Armed-Forces</option>
            <option value="Priv-house-serv">Priv-house-serv</option>
          </select>

          {/* Education field */}
          <label htmlFor="education" className="text-black">
            Education
          </label>
          <select
            name="education"
            id="education"
            className="border-2 border-slate-900 p-2 text-black"
          >
            <option value="HS-grad">HS-grad</option>
            <option value="7th-8th">7th-8th</option>
            <option value="Some-college">Some-college</option>
            <option value="10th">10th</option>
            <option value="Doctorate">Doctorate</option>
            <option value="Prof-school">Prof-school</option>
            <option value="Bachelors">Bachelors</option>
            <option value="Masters">Masters</option>
            <option value="11th">11th</option>
            <option value="Assoc-voc">Assoc-voc</option>
            <option value="1st-4th">1st-4th</option>
            <option value="5th-6th">5th-6th</option>
            <option value="Assoc-acdm">Assoc-acdm</option>
            <option value="12th">12th</option>
            <option value="9th">9th</option>
            <option value="Preschool">Preschool</option>
          </select>

          {/* Hrs. per week field */}
          <label htmlFor="hours_per_week" className="text-black">
            Hours per week
          </label>
          <input
            type="number"
            name="hours_per_week"
            id="hours_per_week"
            className="border-2 border-slate-900 p-2 text-black"
          />

          {/* Marital status field */}
          <label htmlFor="marital_status" className="text-black">
            Marital Status
          </label>
          <select
            name="marital_status"
            id="marital_status"
            className="border-2 border-slate-900 p-2 text-black"
          >
            <option value="Widowed">Widowed</option>
            <option value="Divorced">Divorced</option>
            <option value="Separated">Separated</option>
            <option value="Never-married">Never-married</option>
            <option value="Married-civ-spouse">Married-civ-spouse</option>
            <option value="Married-spouse-absent">Married-spouse-absent</option>
            <option value="Married-AF-spouse">Married-AF-spouse</option>
          </select>

          {/* Cap. gain field */}
          <label htmlFor="capital_gain" className="text-black">
            Capital Gain
          </label>
          <input
            type="number"
            name="capital_gain"
            id="capital_gain"
            className="border-2 border-slate-900 p-2 text-black"
          />

          {/* Cap. loss field */}
          <label htmlFor="capital_loss" className="text-black">
            Capital Loss
          </label>
          <input
            type="number"
            name="capital_loss"
            id="capital_loss"
            className="border-2 border-slate-900 p-2 text-black"
          />

          {/* Sex field */}
          <label htmlFor="sex" className="text-black">
            Sex
          </label>
          <select
            name="sex"
            id="sex"
            className="border-2 border-slate-900 p-2 text-black"
          >
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>

          {/* Submit button */}
          <button
            type="submit"
            title="Predict"
            className="bg-slate-900 text-white p-2 rounded hover:bg-slate-800"
          >
            Predict
          </button>
        </form>

        {/* Render model predictions from the backend */}
        {modelPreds !== null && modelPreds !== undefined && (
          <section className="w-full max-w-md flex flex-col gap-4 bg-white mb-8 p-8 rounded-lg shadow-lg text-black">
            <h3 className="text-lg font-bold">Prediction</h3>
            <p>
              Expected to make $50K or more annually:{" "}
              {modelPreds === 0 ? (
                <span className="italic text-red-500">No</span>
              ) : (
                <span className="italic text-green-500">Yes</span>
              )}
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
