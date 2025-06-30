import React, { useState } from "react";
import Turnstile from "react-cloudflare-turnstile";
import { toast, Toaster } from "react-hot-toast";
import useSound from "use-sound";
import submitSfx from "../assets/success.wav";

export default function SubmitComplaint() {
  const categories = ["Produce", "Dairy", "Bakery", "Meat", "Frozen", "Beverages"];
  const products = {
    Produce: ["Apples", "Bananas", "Lettuce"],
    Dairy: ["Milk", "Cheese", "Yogurt"],
    Bakery: ["Bread", "Muffins"],
    Meat: ["Chicken", "Beef"],
    Frozen: ["Frozen Pizza", "Ice Cream"],
    Beverages: ["Soda", "Water", "Juice"],
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "",
    product: "",
    complaint: "",
    turnstileToken: "",
  });

  const [playSuccess] = useSound(submitSfx, { volume: 0.4 });

  console.log("SITEKEY:", process.env.REACT_APP_TURNSTILE_SITEKEY);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTurnstile = (token) => {
    console.log("Turnstile token received:", token);
    setForm((prev) => ({ ...prev, turnstileToken: token }));
  };

  const validateForm = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = "Name is required.";
    if (!form.email.trim()) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = "Invalid email format.";
    if (!form.category) errors.category = "Please select a category.";
    if (!form.product) errors.product = "Please select a product.";
    if (!form.complaint.trim()) errors.complaint = "Complaint is required.";
    if (!form.turnstileToken) errors.turnstileToken = "CAPTCHA is required.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((msg) =>
        toast.error(msg, {
          duration: 4000,
          style: { backgroundColor: "#fee2e2", color: "#b91c1c" },
        })
      );
      return;
    }

    const toastId = toast.loading("Submitting complaint...");
    try {
      const res = await fetch("https://your-api-id.amazonaws.com/dev/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await res.json();
      if (res.ok) {
        playSuccess();
        toast.success("✅ Complaint submitted!", {
          id: toastId,
          style: { backgroundColor: "#d1fae5", color: "#065f46" },
        });

        setForm({
          name: "",
          email: "",
          category: "",
          product: "",
          complaint: "",
          turnstileToken: "",
        });
      } else {
        toast.error(`❌ ${result.message || "Error submitting complaint"}`, { id: toastId });
      }
    } catch (error) {
      toast.error("❌ Network error. Try again.", { id: toastId });
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="max-w-md mx-auto mt-6 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">📝 Submit a Complaint</h2>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <select
            name="product"
            value={form.product}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="">-- Select Product --</option>
            {(products[form.category] || []).map((prod) => (
              <option key={prod}>{prod}</option>
            ))}
          </select>
          <textarea
            name="complaint"
            placeholder="Write your complaint here..."
            value={form.complaint}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          <Turnstile
            sitekey={process.env.REACT_APP_TURNSTILE_SITEKEY}
            onSuccess={handleTurnstile}
            className="rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
          >
            📤 Submit Complaint
          </button>
        </form>
      </div>
    </>
  );
}
