import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Toaster } from "react-hot-toast"; // ✅ Import Toaster

import Home from "./components/Home";
import SubmitComplaint from "./components/SubmitComplaint";
import ComplaintDashboard from "./components/ComplaintDashboard";
import ProductPage from "./components/ProductPage";
import NotFound from "./components/NotFound";

function App({ signOut, user }) {
  const groups = user?.signInUserSession?.accessToken?.payload["cognito:groups"] || [];
  const isStaff = groups.includes("admin") || groups.includes("worker") || groups.includes("owner");

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-6">
        <Toaster position="top-center" /> {/* ✅ Add this line */}

        {/* Navigation Bar */}
        <nav className="mb-6 flex justify-between items-center border-b pb-4">
          <div className="space-x-4">
            <Link to="/" className="text-blue-600 hover:underline">🏠 Home</Link>
            <Link to="/submit" className="text-blue-600 hover:underline">📝 Submit Complaint</Link>
            {isStaff && (
              <Link to="/dashboard" className="text-blue-600 hover:underline">📊 Dashboard</Link>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">👋 {user?.username}</p>
            <button
              onClick={signOut}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
        </nav>

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/submit" element={<SubmitComplaint />} />
          {isStaff && <Route path="/dashboard" element={<ComplaintDashboard />} />}
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default withAuthenticator(App);
