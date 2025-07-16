import Expense from "../models/expensesModel.js";
import asyncHandler from "express-async-handler";
import customError from "../utils/customError.js";

const creatExpense = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { title, amount, date, category, notes } = req.body;

  if (!title || !amount || !date) {
    return next(new customError("Title, amount, and date are required", 400));
  }

  const expense = new Expense({
    userId,
    title,
    amount,
    date,
    category: category,
    notes: notes || "",
  });
  const savedExpense = await expense.save();
  if (!savedExpense) {
    return next(new customError("Failed to create expense", 500));
  }
  res
    .status(201)
    .json({ message: "Expense created successfully", expense: savedExpense });
});

const getExpenses = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { filter, startDate, endDate, category } = req.query;

  const query = { userId };

  if (filter) {
    const now = new Date(); //	2025-06-01

    if (filter === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate() - 7);
      query.date = { $gte: weekAgo, $lte: now };
    } else if (filter === "month") {
      const monthAgo = new Date();
      monthAgo.setMonth(now.getMonth() - 1);
      query.date = { $gte: monthAgo, $lte: now };
    } else if (filter === "3months") {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(now.getMonth() - 3);
      query.date = { $gte: threeMonthsAgo, $lte: now };
    } else if (filter === "year") {
      const yearAgo = new Date();
      yearAgo.setFullYear(now.getFullYear() - 1);
      query.date = { $gte: yearAgo, $lte: now };
    }
  }

  if (startDate && endDate) {
    query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  if (category) {
    query.category = category;
  }

  const expenses = await Expense.find(query).sort({ date: -1 });

  if (!expenses) {
    return next(new customError("No expenses found", 404));
  }
  res.status(200).json({
    message: "Expenses retrieved successfully",
    Data: {
      length: expenses.length,
      expenses: expenses,
    },
  });
});

const getExpensesById = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const expenseId = req.params.id;

  const expense = await Expense.findOne({ _id: expenseId, userId });

  if (!expense) {
    return next(new customError("Expense not found", 404));
  }

  res.status(200).json({
    message: "Expense retrieved successfully",
    expense: expense,
  });
});

const updateExpense = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const expenseId = req.params.id;

  const updatedExpense = await Expense.findOneAndUpdate(
    { _id: expenseId, userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedExpense) {
    return next(new customError("Expense not found or update failed", 404));
  }

  res.status(200).json({
    message: "Expense updated successfully",
    expense: updatedExpense,
  });
});

const deleteExpense = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const expenseId = req.params.id;

  const deletedExpense = await Expense.findOneAndDelete({
    _id: expenseId,
    userId,
  });

  if (!deletedExpense) {
    return next(new customError("Expense not found or delete failed", 404));
  }

  res.status(204).json({ message: "Expense deleted successfully" });
});

const last5Expenses = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const expenses = await Expense.find({ userId }).sort({ date: -1 }).limit(5);

  if (!expenses) {
    return next(new customError("No expenses found", 404));
  }

  res.status(200).json({
    message: "Last 5 expenses retrieved successfully",
    expenses: expenses,
  });
});

const getMostUsedcategory = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const now = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(now.getMonth() - 3);

  const expenses = await Expense.aggregate([
    { $match: { userId, date: { $gte: threeMonthsAgo, $lte: now } } },
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 1 },
  ]);

  if (expenses.length === 0) {
    return next(new customError("No expenses found", 404));
  }

  res.status(200).json({
    message: "Most used category retrieved successfully",
    category: expenses[0]._id,
    count: expenses[0].count,
  });
});

const getCategorySummary = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const expenses = await Expense.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: "$category",
        totalAmount: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
    { $sort: { totalAmount: -1 } },
  ]);
  if (expenses.length === 0) {
    return next(new customError("No expenses found", 404));
  }
  res.status(200).json({
    message: "Category summary retrieved successfully",
    categories: expenses,
  });
});

const highestSpendedCategory = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
 const now = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(now.getMonth() - 3);

  const expenses = await Expense.aggregate([
    { $match: { userId, date: { $gte: threeMonthsAgo, $lte: now } } },
    { $group: { _id: "$category", totalAmount: { $sum: "$amount" } } },
    { $sort: { totalAmount: -1 } },
    { $limit: 1 },
  ]);

  if (expenses.length === 0) {
    return next(new customError("No expenses found", 404));
  }

  res.status(200).json({
    message: "Highest spent category retrieved successfully",
    category: expenses[0]._id,
    totalAmount: expenses[0].totalAmount,
  });
});
 

const getLastMonthCategorySummary = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const now = new Date();
  const lastMonth = new Date();
  lastMonth.setMonth(now.getMonth() - 1);

  const expenses = await Expense.aggregate([
    { $match: { userId, date: { $gte: lastMonth, $lte: now } } },
    {
      $group: {
        _id: "$category",
        totalAmount: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
    { $sort: { totalAmount: -1 } },
  ]);

  if (expenses.length === 0) {
    return next(new customError("No expenses found for the last month", 404));
  }

  res.status(200).json({
    message: "Last month category summary retrieved successfully",
    categories: expenses,
  });
});

export {
  creatExpense,
  getExpenses,
  getExpensesById,
  updateExpense,
  deleteExpense,
  last5Expenses,
  getMostUsedcategory,
  getCategorySummary,
  highestSpendedCategory,
  getLastMonthCategorySummary,
};
