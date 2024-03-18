const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "expense must have a name"],
    maxLength: [50, "no more than 50 character"],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, "expense must have an amount"],
  },
  date: {
    type: Date,
    required: [true, "expense must have a date"],
  },
  category: {
    type: String,
    required: [true, "expense must have an category"],
    enum: {
      values: [
        "Auto islaidos",
        "Buitines islaidos",
        "Kitka",
        "Maistas",
        "Mokesciai",
        "Paskolos, lizingas",
        "Pramogos",
        "Vaikai",
      ],
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
