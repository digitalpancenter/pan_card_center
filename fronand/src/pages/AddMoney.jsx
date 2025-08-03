import React, { useState } from "react";
import axios from "axios";
import image from "../img/QRcode_pan_center_1.png";

const AddMoney = () => {
  const [amount, setAmount] = useState("");
  const [utr, setUtr] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (amount.trim() === "") {
      setMessage("Amount daaliye.");
      return;
    }
    setMessage("");
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/wallet/add-money",
        { amount, utr },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(res.data.message);
      setAmount("");
      setUtr("");
      setStep(1); // reset step after submission
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        "Failed to add money. Try again.";
      setMessage(errorMsg);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">💸 Add Money</h2>

      <div className="w-[50%] mx-auto flex justify-center mb-4">
        <img
          src={image}
          alt="QR Code"
          className="h-auto rounded shadow-lg"
        />
      </div>

      {message && (
        <p
          className={`text-center mb-4 ${
            message.includes("pehle se") ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <label className="block mb-2">Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Enter amount"
              required
            />
            <button
              type="button"
              onClick={handleNext}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <label className="block mb-2">UTR Number:</label>
            <input
              type="text"
              value={utr}
              onChange={(e) => setUtr(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Enter UTR"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            >
              Submit
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default AddMoney;
