// ✅ Put imports at the very top
import React, { useEffect, useState } from "react";
import { generateClient } from 'aws-amplify/api';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ✅ Setup Amplify API client
const client = generateClient();

export default function ComplaintDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // ✅ Fetch complaints once on mount
  useEffect(() => {
    async function fetchComplaints() {
      try {
        const data = await client.get({ apiName: "kareapi", path: "/complaints" });
        setComplaints(data);
      } catch (err) {
        console.error("❌ Failed to fetch complaints", err);
      }
    }
    fetchComplaints();
  }, []);

  // ✅ Transform and group complaints by product
  useEffect(() => {
    function applyFilters() {
      const grouped = {};
      complaints.forEach((c) => {
        grouped[c.product] = (grouped[c.product] || 0) + 1;
      });
      const result = Object.entries(grouped).map(([product, count]) => ({
        product,
        count,
      }));
      setFilteredData(result);
    }
    applyFilters();
  }, [complaints]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Complaint Dashboard</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={filteredData}>
          <XAxis dataKey="product" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#3182CE" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
