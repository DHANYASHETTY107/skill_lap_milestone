const express = require("express");
const router = express.Router();

// In-memory storage for expenses
let expenses = [
  { id: 1, category: "Groceries", amount: 1000, date: "2023-12-01" },
  { id: 2, category: "Utilities", amount: 500, date: "2023-12-02" },
];

// 1. GET all expenses
router.get("/expenses", (req, res) => {
  res.json({
    status: "success",
    data: expenses,
  });
});

// 2. POST a new expense
router.post("/expenses", (req, res) => {
  const { category, amount, date } = req.body;

  if (!category || !amount || !date) {
    return res.status(400).json({
      status: "error",
      message: "Please provide category, amount, and date.",
    });
  }

  const newExpense = {
    id: expenses.length + 1,
    category,
    amount,
    date,
  };

  expenses.push(newExpense);

  res.json({
    status: "success",
    data: newExpense,
  });
});

// 3. PUT (update) an expense by ID
router.put("/expenses/:id", (req, res) => {
  const { id } = req.params;
  const { category, amount, date } = req.body;

  const expenseIndex = expenses.findIndex((expense) => expense.id === parseInt(id));

  if (expenseIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "Expense not found.",
    });
  }

  expenses[expenseIndex] = {
    ...expenses[expenseIndex],
    category: category || expenses[expenseIndex].category,
    amount: amount || expenses[expenseIndex].amount,
    date: date || expenses[expenseIndex].date,
  };

  res.json({
    status: "success",
    data: expenses[expenseIndex],
  });
});

// 4. DELETE an expense by ID
router.delete("/expenses/:id", (req, res) => {
  const { id } = req.params;

  const expenseIndex = expenses.findIndex((expense) => expense.id === parseInt(id));

  if (expenseIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "Expense not found.",
    });
  }

  const deletedExpense = expenses.splice(expenseIndex, 1);

  res.json({
    status: "success",
    data: deletedExpense[0],
  });
});

module.exports = router;
