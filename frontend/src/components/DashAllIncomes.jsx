import { useState, useEffect } from "react";
import * as service from "../services/incomeExpense";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const DashAllIncomes = () => {
  const [incomes, setIncomes] = useState([]);
  const currentUser = useSelector((state) => state.user);
  const token = currentUser.currentUser.token;

  useEffect(() => {
    const getIncomes = () => {
      service.getAllIncomes(token, setIncomes);
    };
    getIncomes();
  }, []);

  return (
    <div className="max-w-[80%] mx-auto my-auto w-full">
      {currentUser && incomes.length > 0 && (
        <table className="w-full text-sm text-left rtl:text-right border">
          <thead className="text-xl">
            <tr className="">
              <th scope="col" className="px-6 py-3 text-center">
                #
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Edit
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Delete
              </th>
            </tr>
          </thead>
          {incomes.map((income, index) => (
            <tbody key={index}>
              <tr className="border">
                <td className="px-6 py-3 text-center">{index + 1}</td>
                <td className="px-6 py-3 text-center">{income.name}</td>
                <td className="px-6 py-3 text-center">{income.amount}</td>
                <td className="px-6 py-3 text-center">{income.category}</td>
                <td className="px-6 py-3 text-center">
                  {income.date.split("T")[0]}
                </td>
                <td className="px-6 py-3 justify-items-center">
                  <button className="bg-lime-500 rounded-lg py-2 px-5">
                    Edit
                  </button>
                </td>
                <td className="px-6 py-3 justify-items-center">
                  <button className="bg-rose-500 rounded-lg py-2 px-5">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      )}
    </div>
  );
};

export default DashAllIncomes;
