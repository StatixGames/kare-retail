// src/components/ProductPage.js
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products.json"; // Adjust path as needed

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const item = products.find((p) => String(p.id) === String(id));

  if (!item) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-xl font-bold text-red-600">🚫 Product not found</h1>
        <button
          className="mt-4 text-blue-600 hover:underline"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-2">{item.name}</h1>
      <p className="text-gray-600 mb-2">{item.description}</p>
      <p className="text-lg font-semibold mb-4">${item.price}</p>

      <div className="flex gap-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          🛒 Purchase
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => navigate("/submit", { state: { product: item.name } })}
        >
          😠 File Complaint
        </button>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 block text-blue-600 hover:underline"
      >
        ← Back
      </button>
    </div>
  );
}
