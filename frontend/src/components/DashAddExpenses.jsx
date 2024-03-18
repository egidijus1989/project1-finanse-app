import { Button, TextInput } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import * as service from "../services/incomeExpense";

const DashAddExpenses = () => {
  const currentUser = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const token = currentUser.currentUser.token;

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const createExpense = (e) => {
    e.preventDefault();
    service.createExpense(token, formData);
  };
  return (
    <div className="max-w-[35%] mx-auto m-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl uppercase">
        Log New Expense
      </h1>
      <form className="flex flex-col gap-4" onSubmit={createExpense}>
        <TextInput
          type="text"
          id="name"
          placeholder="expense name"
          onChange={handleChange}
        ></TextInput>
        <TextInput
          type="number"
          id="amount"
          placeholder="expense amount"
          onChange={handleChange}
        ></TextInput>
        <TextInput
          type="date"
          id="date"
          placeholder="expense date"
          onChange={handleChange}
        ></TextInput>
        <TextInput
          type="text"
          id="category"
          placeholder="expense category"
          onChange={handleChange}
        ></TextInput>
        <Button type="submit" gradientDuoTone="pinkToOrange" outline>
          Log new Expense
        </Button>
      </form>
    </div>
  );
};

export default DashAddExpenses;
