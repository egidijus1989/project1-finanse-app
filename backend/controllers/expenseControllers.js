const Expense = require("../models/expenseModel");
const APIFeatures = require("../utils/apiFeatures");

//Get all incomes/////////////////////////////////////////////////////////////////
exports.getAllExpenses = async (req, res) => {
  try {
    const expensesData = new APIFeatures(Expense.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const allExpenses = await expensesData.query;
    res.status(200).json({
      status: "Success",
      result: allExpenses.length,
      data: { allExpenses },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
};
//Get incomes by month////////////////////////////////////////////////////////////
exports.getExpensesByMonth = async (req, res) => {
  try {
    const expensesByMonth = await Expense.aggregate([
      {
        $project: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          amount: 1,
        },
      },
      {
        $group: {
          _id: { year: "$year", month: "$month" },
          total: { $sum: "$amount" },
        },
      },
    ]).sort({ year: -1 });
    res.status(200).json({
      status: "Success",
      data: { expensesByMonth },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
};
//Get incomes by category/////////////////////////////////////////////////////////
exports.getIncomesByCategory = async (req, res) => {
  try {
    const expensesByCategory = await Expense.aggregate([
      {
        $project: {
          category: "$category",
          amount: 1,
        },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
    ]);
    res.status(200).json({
      status: "Success",
      data: { expensesByCategory },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
};
//Create income///////////////////////////////////////////////////////////////////
exports.createIncome = async (req, res) => {
  try {
    const newExpense = await Expense.create(req.body);
    res.status(201).json({
      status: "Success",
      message: "new expense is created",
      data: { newExpense },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
};
//Update income///////////////////////////////////////////////////////////////////
exports.updateIncome = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "Success",
      message: "expense is updated",
      data: { expense },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
};
//Delete income///////////////////////////////////////////////////////////////////
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "Success",
      message: "expense is deleted",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "Faild",
      message: err.message,
    });
  }
};
