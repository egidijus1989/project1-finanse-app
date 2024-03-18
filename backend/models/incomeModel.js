const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "income must have a name"],
    maxLength: [50, "no more than 50 character"],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, "income must have an amount"],
  },
  date: {
    type: Date,
    required: [true, "income must have a date"],
  },
  category: {
    type: String,
    required: [true, "income must have an category"],
    enum: {
      values: ["Alga", "Kitka", "Verslas"],
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

const Income = mongoose.model("Income", incomeSchema);
module.exports = Income;
