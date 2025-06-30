import React, { useState } from "react";
import { API } from 'aws-amplify';


export default function ComplaintForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    product: "",
    category: "",
    complaint: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("kareapi", "/submit", { body: form });
      alert("✅ Complaint submitted!");
    } catch (err) {
      console.error(err);
      alert("❌ Submission failed.");
    }
  };

  return (
    <form className="space-y-4 max-w-md" onSubmit={handleSubmit}>
      {["name", "email", "product", "category", "complaint"].map((field) => (
        <input
          key={field}
          name={field}
          value={form[field]}
          onChange={handleChange}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          className="border rounded px-3 py-2 w-full"
          required
        />
      ))}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit Complaint
      </button>
    </form>
  );
}
