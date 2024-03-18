import { useState, PureComponent, useEffect } from "react";
import { useSelector } from "react-redux";
import * as service from "../services/incomeExpense";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector,
  Cell,
} from "recharts";

const DashChartIncomes = () => {
  const currentUser = useSelector((state) => state.user);
  const [incomesByMonth, setIncomesByMonth] = useState([]);
  const [incomesByCategory, setIncomesByCategory] = useState([]);
  const token = currentUser.currentUser.token;

  useEffect(() => {
    const getIncomesByMonth = () => {
      service.getAllIncomesByMonth(token, setIncomesByMonth);
    };
    getIncomesByMonth();
  }, []);
  useEffect(() => {
    const getIncomesByCategory = () => {
      service.getAllIncomesByCategory(token, setIncomesByCategory);
    };
    getIncomesByCategory();
  }, []);

  console.log(incomesByMonth);
  console.log(incomesByCategory);
  return (
    <div className="max-w-[80%] mx-auto m-3 w-full flex flex-col">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={incomesByMonth}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id.month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="total"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="total"
            startAngle={360}
            endAngle={0}
            data={incomesByCategory}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashChartIncomes;
