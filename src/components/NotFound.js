// src/components/NotFound.js
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center mt-32">
      <h1 className="text-4xl font-bold text-red-600">404</h1>
      <p className="text-xl text-gray-700 mb-4">Page not found 😢</p>
      <Link to="/" className="text-blue-600 underline">
        🏠 Go Home
      </Link>
    </div>
  );
}
