const express = require("express");
const router = express.Router();

const expenseController = require("../controllers/expenseControllers");
const authController = require("../controllers/authControllers");

router
  .route("/")
  .get(authController.protect, expenseController.getAllExpenses)
  .post(authController.protect, expenseController.createIncome);

router
  .route("/expensesByMonth")
  .get(authController.protect, expenseController.getExpensesByMonth);
router
  .route("/expensesByCategory")
  .get(authController.protect, expenseController.getIncomesByCategory);

router
  .route("/:id")
  .patch(authController.protect, expenseController.updateIncome)
  .delete(authController.protect, expenseController.deleteExpense);

module.exports = router;
