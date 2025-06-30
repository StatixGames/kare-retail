// src/components/Home.js
import React from "react";
import { Link } from "react-router-dom";
import products from "../data/products.json";

export default function Home() {
  // Group products by category
  const grouped = products.reduce((acc, product) => {
    const { category } = product;
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold mb-4">🛒 Product Catalog</h1>

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded shadow hover:shadow-lg transition"
              >
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-green-700 font-semibold mb-2">
                  ${item.price.toFixed(2)}
                </p>
                <Link
                  to={`/product/${item.id}`}
                  className="text-blue-600 hover:underline"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
