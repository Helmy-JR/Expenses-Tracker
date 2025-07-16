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

/**
 * @swagger
 * /api/expenses:
 *   get:
 *     summary: Get user expenses
 *     description: |
 *       Retrieves expenses for the authenticated user.  
 *       Supports filtering by:
 *         - Preset time ranges: `week`, `month`, `3months`, `year`
 *         - Custom date range: `startDate` and `endDate`
 *         - Category : `Groceries`,`Leisure`,`Electronics`,`Utilities`,`Clothing`,`Health`,`Other`,
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *           enum: [week, month, 3months, year]
 *         description: Filter expenses by relative time range.
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start of custom date range.
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End of custom date range.
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by expense category.
 *     responses:
 *       200:
 *         description: Expenses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Expenses retrieved successfully
 *                 Data:
 *                   type: object
 *                   properties:
 *                     length:
 *                       type: integer
 *                       example: 1
 *                     expenses:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "6865fc3f428df42c7983b8af"
 *                           userId:
 *                             type: string
 *                             example: "6863f26510dcb6869ff3df4e"
 *                           title:
 *                             type: string
 *                             example: "Vegetables and fruits"
 *                           amount:
 *                             type: number
 *                             example: 60
 *                           category:
 *                             type: string
 *                             example: "Groceries"
 *                           date:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-06-30T00:00:00.000Z"
 *                           notes:
 *                             type: string
 *                             example: "Fresh produce"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-07-03T03:42:55.224Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-07-03T03:42:55.224Z"
 *                           __v:
 *                             type: integer
 *                             example: 0
 *       404:
 *         description: No expenses found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No expenses found
 */

/**
 * @swagger
 * /api/expenses/{id}:
 *   get:
 *     summary: Get a specific expense by ID
 *     description: Retrieves a single expense by its ID for the authenticated user.
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the expense to retrieve.
 *         schema:
 *           type: string
 *           example: 6865fc3f428df42c7983b8af
 *     responses:
 *       200:
 *         description: Expense retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Expense retrieved successfully
 *                 expense:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "6865fc3f428df42c7983b8af"
 *                     userId:
 *                       type: string
 *                       example: "6863f26510dcb6869ff3df4e"
 *                     title:
 *                       type: string
 *                       example: "Vegetables and fruits"
 *                     amount:
 *                       type: number
 *                       example: 60
 *                     category:
 *                       type: string
 *                       enum:
 *                         - Groceries
 *                         - Leisure
 *                         - Electronics
 *                         - Utilities
 *                         - Clothing
 *                         - Health
 *                         - Other
 *                       example: "Groceries"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-06-30T00:00:00.000Z"
 *                     notes:
 *                       type: string
 *                       example: "Fresh produce"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-07-03T03:42:55.224Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-07-03T03:42:55.224Z"
 *                     __v:
 *                       type: integer
 *                       example: 0
 *       404:
 *         description: Expense not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Expense not found
 */

/**
 * @swagger
 * /api/expenses/{id}:
 *   patch:
 *     summary: Update an existing expense
 *     description: Updates an expense by its ID for the authenticated user.
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the expense to update.
 *         schema:
 *           type: string
 *           example: 6865fc3f428df42c7983b8af
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Vegetables and fruits"
 *               amount:
 *                 type: number
 *                 example: 101
 *               category:
 *                 type: string
 *                 enum:
 *                   - Groceries
 *                   - Leisure
 *                   - Electronics
 *                   - Utilities
 *                   - Clothing
 *                   - Health
 *                   - Other
 *                 example: "Groceries"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-30"
 *               notes:
 *                 type: string
 *                 example: "Fresh produce"
 *     responses:
 *       200:
 *         description: Expense updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Expense updated successfully
 *                 expense:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "6865fc3f428df42c7983b8af"
 *                     userId:
 *                       type: string
 *                       example: "6863f26510dcb6869ff3df4e"
 *                     title:
 *                       type: string
 *                       example: "Vegetables and fruits"
 *                     amount:
 *                       type: number
 *                       example: 101
 *                     category:
 *                       type: string
 *                       example: "Groceries"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-06-30T00:00:00.000Z"
 *                     notes:
 *                       type: string
 *                       example: "Fresh produce"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-07-03T03:42:55.224Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-07-16T17:07:37.051Z"
 *                     __v:
 *                       type: integer
 *                       example: 0
 *       404:
 *         description: Expense not found or update failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Expense not found or update failed
 */

/**
 * @swagger
 * /api/expenses:
 *   post:
 *     tags:
 *       - Expenses
 *     summary: Create a new expense
 *     description: Creates a new expense for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - amount
 *               - date
 *             properties:
 *               title:
 *                 type: string
 *                 example: "fifa 25"
 *               amount:
 *                 type: number
 *                 example: 150
 *               category:
 *                 type: string
 *                 example: "Utilities"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-26"
 *               notes:
 *                 type: string
 *                 example: "New prescription"
 *     responses:
 *       201:
 *         description: Expense created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Expense created successfully
 *                 expense:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: "6863f26510dcb6869ff3df4e"
 *                     title:
 *                       type: string
 *                       example: "fifa 25"
 *                     amount:
 *                       type: number
 *                       example: 150
 *                     category:
 *                       type: string
 *                       example: "Utilities"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-06-26T00:00:00.000Z"
 *                     notes:
 *                       type: string
 *                       example: "New prescription"
 *                     _id:
 *                       type: string
 *                       example: "6877c280004cb6564e641ec0"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-07-16T15:17:20.349Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-07-16T15:17:20.349Z"
 *                     __v:
 *                       type: integer
 *                       example: 0
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Title, amount, and date are required
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to create expense
 */

/**
 * @swagger
 * /api/expenses/{id}:
 *   delete:
 *     summary: Delete an expense
 *     description: Deletes an expense by its ID for the authenticated user.
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the expense to delete.
 *         schema:
 *           type: string
 *           example: 6865fc3f428df42c7983b8af
 *     responses:
 *       204:
 *         description: Expense deleted successfully (no content)
 *       404:
 *         description: Expense not found or delete failed
 */

/**
 * @swagger
 * /api/expenses/last5:
 *   get:
 *     summary: Get the last 5 expenses
 *     description: Retrieves the most recent 5 expenses for the authenticated user, sorted by date in descending order.
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Last 5 expenses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Last 5 expenses retrieved successfully
 *                 expenses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "6865fc02428df42c7983b898"
 *                       userId:
 *                         type: string
 *                         example: "6863f26510dcb6869ff3df4e"
 *                       title:
 *                         type: string
 *                         example: "Weekly groceries"
 *                       amount:
 *                         type: number
 *                         example: 150
 *                       category:
 *                         type: string
 *                         enum:
 *                           - Groceries
 *                           - Leisure
 *                           - Electronics
 *                           - Utilities
 *                           - Clothing
 *                           - Health
 *                           - Other
 *                         example: "Groceries"
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-06-28T00:00:00.000Z"
 *                       notes:
 *                         type: string
 *                         example: "Carrefour"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-07-03T03:41:54.199Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-07-03T03:41:54.199Z"
 *                       __v:
 *                         type: integer
 *                         example: 0
 *       404:
 *         description: No expenses found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No expenses found
 */

/**
 * @swagger
 * /api/expenses/most-used-category:
 *   get:
 *     summary: Get most used category in the last 3 months
 *     description: Returns the category with the highest number of expenses by the authenticated user in the last 3 months.
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Most used category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Most used category retrieved successfully
 *                 category:
 *                   type: string
 *                   enum:
 *                     - Groceries
 *                     - Leisure
 *                     - Electronics
 *                     - Utilities
 *                     - Clothing
 *                     - Health
 *                     - Other
 *                   example: Utilities
 *                 count:
 *                   type: integer
 *                   example: 4
 *       404:
 *         description: No expenses found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No expenses found
 */

/**
 * @swagger
 * /api/expenses/category-summary:
 *   get:
 *     summary: Get summary of expenses by category
 *     description: Returns the total amount and number of expenses per category for the authenticated user.
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category summary retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category summary retrieved successfully
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         enum:
 *                           - Groceries
 *                           - Leisure
 *                           - Electronics
 *                           - Utilities
 *                           - Clothing
 *                           - Health
 *                           - Other
 *                         example: Health
 *                       totalAmount:
 *                         type: number
 *                         example: 770
 *                       count:
 *                         type: integer
 *                         example: 3
 *             example:
 *               message: Category summary retrieved successfully
 *               categories:
 *                 - _id: Health
 *                   totalAmount: 770
 *                   count: 3
 *                 - _id: Clothing
 *                   totalAmount: 750
 *                   count: 3
 *                 - _id: Electronics
 *                   totalAmount: 735
 *                   count: 3
 *                 - _id: Utilities
 *                   totalAmount: 650
 *                   count: 4
 *                 - _id: Leisure
 *                   totalAmount: 390
 *                   count: 3
 *                 - _id: Other
 *                   totalAmount: 270
 *                   count: 2
 *                 - _id: Groceries
 *                   totalAmount: 185
 *                   count: 2
 *       404:
 *         description: No expenses found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No expenses found
 */

/**
 * @swagger
 * /api/expenses/highest-spent-category:
 *   get:
 *     summary: Get highest spent category in the last 3 months
 *     description: Returns the category in which the authenticated user spent the most money during the past 3 months.
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Highest spent category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Highest spent category retrieved successfully
 *                 category:
 *                   type: string
 *                   enum:
 *                     - Groceries
 *                     - Leisure
 *                     - Electronics
 *                     - Utilities
 *                     - Clothing
 *                     - Health
 *                     - Other
 *                   example: Health
 *                 totalAmount:
 *                   type: number
 *                   example: 770
 *             example:
 *               message: Highest spent category retrieved successfully
 *               category: Health
 *               totalAmount: 770
 *       404:
 *         description: No expenses found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No expenses found
 */

/**
 * @swagger
 * /api/expenses/last-month-summary:
 *   get:
 *     summary: Get category summary for the last month
 *     description: Returns the total amount and number of expenses per category for the authenticated user in the last month.
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Last month category summary retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Last month category summary retrieved successfully
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         enum:
 *                           - Groceries
 *                           - Leisure
 *                           - Electronics
 *                           - Utilities
 *                           - Clothing
 *                           - Health
 *                           - Other
 *                         example: Health
 *                       totalAmount:
 *                         type: number
 *                         example: 770
 *                       count:
 *                         type: integer
 *                         example: 3
 *             example:
 *               message: Last month category summary retrieved successfully
 *               categories:
 *                 - _id: Health
 *                   totalAmount: 770
 *                   count: 3
 *                 - _id: Leisure
 *                   totalAmount: 200
 *                   count: 1
 *                 - _id: Groceries
 *                   totalAmount: 185
 *                   count: 2
 *                 - _id: Other
 *                   totalAmount: 180
 *                   count: 1
 *                 - _id: Utilities
 *                   totalAmount: 150
 *                   count: 1
 *       404:
 *         description: No expenses found for the last month
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No expenses found for the last month
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