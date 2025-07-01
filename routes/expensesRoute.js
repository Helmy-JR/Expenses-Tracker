import express from "express";
import {
  creatExpense,
  getExpenses,
  getExpensesById,
  updateExpense,
  deleteExpense,
} from "../controllers/expensesController.js";
import { isAuthenticated } from "../controllers/userController.js";

const router = express.Router();
router.use(isAuthenticated);

router.get("/getExpenses", getExpenses);
router.get("/getExpenseById/:id", getExpensesById);
router.post("/creatExpense", creatExpense);
router.patch("/updateExpense/:id", updateExpense);
router.delete("/deleteExpense/:id", deleteExpense);

export default router;
