import { Button, TextInput } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import * as service from "../services/incomeExpense";

const DashAddIncome = () => {
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

  const createIncome = (e) => {
    e.preventDefault();
    service.createIncome(token, formData);
  };
  return (
    <div className="max-w-[35%] mx-auto m-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl uppercase">
        Log New Income
      </h1>
      <form className="flex flex-col gap-4" onSubmit={createIncome}>
        <TextInput
          type="text"
          id="name"
          placeholder="income name"
          onChange={handleChange}
        ></TextInput>
        <TextInput
          type="number"
          id="amount"
          placeholder="income amount"
          onChange={handleChange}
        ></TextInput>
        <TextInput
          type="date"
          id="date"
          placeholder="income date"
          onChange={handleChange}
        ></TextInput>
        <TextInput
          type="text"
          id="category"
          placeholder="income category"
          onChange={handleChange}
        ></TextInput>
        <Button type="submit" gradientDuoTone="pinkToOrange" outline>
          Log new Income
        </Button>
      </form>
    </div>
  );
};

export default DashAddIncome;
