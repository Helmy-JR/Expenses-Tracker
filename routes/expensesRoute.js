import express from "express";
import {
  creatExpense,
  getExpenses,
  getExpensesById,
  updateExpense,
  deleteExpense,
  last5Expenses,
  getMostUsedcategory,
  getCategorySummary,
  highestSpendedCategory,
  getLastMonthCategorySummary
} from "../controllers/expensesController.js";
import { isAuthenticated } from "../controllers/userController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Expenses
 *   description: Expenses endpoints
 */

router.use(isAuthenticated);

router.get("/getExpenses", getExpenses);
router.get("/getExpenseById/:id", getExpensesById);
router.get("/last5Expenses", last5Expenses);
router.get("/mostUsedCategory", getMostUsedcategory);
router.get("/categorySummary", getCategorySummary);
router.get("/highestSpendedCategory", highestSpendedCategory);
router.get("/lastMonthCategorySummary", getLastMonthCategorySummary);
router.post("/creatExpense", creatExpense);
router.patch("/updateExpense/:id", updateExpense);
router.delete("/deleteExpense/:id", deleteExpense);

export default router;
