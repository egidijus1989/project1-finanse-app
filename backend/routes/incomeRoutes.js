const express = require("express");
const router = express.Router();

const incomeController = require("../controllers/incomeControllers");
const authController = require("../controllers/authControllers");

router
  .route("/")
  .get(authController.protect, incomeController.getAllIncomes)
  .post(authController.protect, incomeController.createIncome);

router
  .route("/incomesByMonth")
  .get(authController.protect, incomeController.getIncomesByMonth);
router
  .route("/incomesByCategory")
  .get(authController.protect, incomeController.getIncomesByCategory);

router
  .route("/:id")
  .patch(authController.protect, incomeController.updateIncome)
  .delete(authController.protect, incomeController.deleteIncome);

module.exports = router;
