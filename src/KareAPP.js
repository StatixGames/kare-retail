import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import ComplaintDashboard from "./components/ComplaintDashboard";
import SubmitComplaint from "./components/SubmitComplaint"; // your form

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-blue-600">
          K.A.R.E. Complaint Dashboard
        </h1>
        <p className="mt-1 text-gray-700">
          View the number of complaints per product or submit your own.
        </p>
      </header>

      {/* ✅ TEMPORARY Tailwind Test Box */}
      <div className="bg-red-500 text-white p-4 rounded mb-4">
        Tailwind is working!
      </div>

      <main className="space-y-10">
        <SubmitComplaint />
        <ComplaintDashboard />
      </main>
    </div>
  );
}

export default withAuthenticator(App);
