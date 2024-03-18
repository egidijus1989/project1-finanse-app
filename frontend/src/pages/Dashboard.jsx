import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashAddExpenses from "../components/DashAddExpenses";
import DashAddIncome from "../components/DashAddIncome";
import DashAllExpenses from "../components/DashAllExpenses";
import DashAllIncomes from "../components/DashAllIncomes";
import DashChartExpenses from "../components/DashChartExpenses";
import DashChartIncomes from "../components/DashChartIncomes";
import DashProfile from "../components/DashProfile";
import DashSidebar from "../components/DashSidebar";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="ms:w-56">
        <DashSidebar />
      </div>
      {tab === "profile" && <DashProfile />}
      {tab === "addIncome" && <DashAddIncome />}
      {tab === "allIncomes" && <DashAllIncomes />}
      {tab === "chartIncomes" && <DashChartIncomes />}
      {tab === "addExpense" && <DashAddExpenses />}
      {tab === "allExpenses" && <DashAllExpenses />}
      {tab === "chartExpenses" && <DashChartExpenses />}
    </div>
  );
};

export default Dashboard;
