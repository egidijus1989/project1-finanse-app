//////////////////////////////////////createIncome//////////////////////////////////////
export const createIncome = async (token, formData) => {
  try {
    const res = await fetch(`http://localhost:8888/api/v1/incomes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
  } catch (error) {
    console.log(error.message);
  }
};
//////////////////////////////////////getAllIncomes/////////////////////////////////////
export const getAllIncomes = async (token, setIncomes) => {
  try {
    const res = await fetch(`http://localhost:8888/api/v1/incomes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    if (res.ok) {
      setIncomes(data.data.allIncomes);
    }
  } catch (error) {
    console.log(error.message);
  }
};
//////////////////////////////////////getAllIncomesByMonth//////////////////////////////
export const getAllIncomesByMonth = async (token, setIncomesByMonth) => {
  try {
    const res = await fetch(
      `http://localhost:8888/api/v1/incomes/incomesByMonth`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const data = await res.json();
    if (res.ok) {
      setIncomesByMonth(data.data.incomesByMonth);
    }
  } catch (error) {
    console.log(error.message);
  }
};
//////////////////////////////////////getAllIncomesByCategory//////////////////////////
export const getAllIncomesByCategory = async (token, setIncomesByCategory) => {
  try {
    const res = await fetch(
      `http://localhost:8888/api/v1/incomes/incomesByCategory`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const data = await res.json();
    if (res.ok) {
      setIncomesByCategory(data.data.incomesByCategory);
    }
  } catch (error) {
    console.log(error.message);
  }
};
//////////////////////////////////////updateIncome//////////////////////////////////////
//////////////////////////////////////deleteIncome//////////////////////////////////////
//////////////////////////////////////createExpense//////////////////////////////////////
export const createExpense = async (token, formData) => {
  try {
    const res = await fetch(`http://localhost:8888/api/v1/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
  } catch (error) {
    console.log(error.message);
  }
};
//////////////////////////////////////getAllExpenses/////////////////////////////////////
export const getAllExpenses = async (token, setExpenses) => {
  try {
    const res = await fetch(`http://localhost:8888/api/v1/expenses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    if (res.ok) {
      setExpenses(data.data.allExpenses);
    }
  } catch (error) {
    console.log(error.message);
  }
};
//////////////////////////////////////getAllExpensesByMonth//////////////////////////////
//////////////////////////////////////getAllExpensesByCategory//////////////////////////
//////////////////////////////////////updateExpense//////////////////////////////////////
//////////////////////////////////////deleteExpense//////////////////////////////////////
