import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import usePageTitle from "../../hooks/usePageTitle";
import { FiUsers, FiDollarSign, FiSettings } from "react-icons/fi";

const Dashboard = () => {
  usePageTitle("Dashboard");

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning! ☀️");
    else if (hour < 18) setGreeting("Good Afternoon! 🌤️");
    else setGreeting("Good Evening! 🌙");
  }, []);

  return (
    <div className="p-6 bg-gray-100">
      <h4 className="text-2xl font-bold">{greeting}</h4>
      <p className="text-gray-600">Welcome back! Here's an overview of your dashboard.</p>
    </div>
  );
};

export default Dashboard;
