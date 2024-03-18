const express = require("express");
const morgan = require("morgan");
const app = express();
const router = express.Router();
const incomesRouter = require("./routes/incomeRoutes");
const expensesRouter = require("./routes/expenseRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//Routes///////////////////////////////////////////////////////
app.use("/api/v1/incomes", incomesRouter);
app.use("/api/v1/expenses", expensesRouter);
app.use("/api/v1/auth", authRoutes);

module.exports = app;
