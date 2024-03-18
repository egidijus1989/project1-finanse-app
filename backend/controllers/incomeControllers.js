const Income = require("../models/incomeModel");
const APIFeatures = require("../utils/apiFeatures");

//Get all incomes/////////////////////////////////////////////////////////////////
exports.getAllIncomes = async (req, res) => {
  try {
    const incomesData = new APIFeatures(Income.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const allIncomes = await incomesData.query;
    res.status(200).json({
      status: "Success",
      result: allIncomes.length,
      data: { allIncomes },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
};
//Get incomes by month////////////////////////////////////////////////////////////
exports.getIncomesByMonth = async (req, res) => {
  try {
    const incomesByMonth = await Income.aggregate([
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
      data: { incomesByMonth },
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
    const incomesByCategory = await Income.aggregate([
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
      data: { incomesByCategory },
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
    const newIncome = await Income.create(req.body);
    res.status(201).json({
      status: "Success",
      message: "new income is created",
      data: { newIncome },
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
    const income = await Income.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "Success",
      message: "income is updated",
      data: { income },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
};
//Delete income///////////////////////////////////////////////////////////////////
exports.deleteIncome = async (req, res) => {
  try {
    const income = await Income.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "Success",
      message: "income is deleted",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "Faild",
      message: err.message,
    });
  }
};
