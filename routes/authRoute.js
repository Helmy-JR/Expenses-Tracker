import express from "express";
import {
  signup,
  login,
  googleId,
  sendCode,
  verifyCode,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user with email , password, firstName and lastName.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: MyStrongPassword123
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               token:
 *                type: string
 *                example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: User forgot to provide a field or email already exist or invalid email
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               message:
 *                type: string
 *                example: "Email already exist"
 *
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     description: Login a user with email and password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: MyStrongPassword123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               token:
 *                type: string
 *                example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: User forgot to provide a field
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               message:
 *                type: string
 *                example: "Please provide an email and password"
 *       401:
 *         description: invalid credentials
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               message:
 *                type: string
 *                example: "Invalid credentials"
 *       404:
 *         description: User not found
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               message:
 *                type: string
 *                example: "User not found"
 *
 */

/**
 * @swagger
 * /api/auth/google:
 *   post:
 *     summary: Continue with Google
 *     description: Login a user with googleId, email, firstName and lastName.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - googleId
 *               - email
 *               - firstName
 *               - lastName
 *             properties:
 *               googleId:
 *                 type: string
 *                 example: 1234567890
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               token:
 *                type: string
 *                example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: User forgot to provide a field
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               message:
 *                type: string
 *                example: "Please provide an email and password"
 *       401:
 *         description: invalid credentials
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               message:
 *                type: string
 *                example: "Invalid credentials"
 */

/**
 * @swagger
 * /api/auth/send-code:
 *   post:
 *     summary: Send code to user email
 *     description: Send code to user email to reset password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Code sent successfully
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               message:
 *                type: string
 *                example: "Code sent successfully"
 *       400:
 *         description: User forgot to provide a field
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               message:
 *                type: string
 *                example: "Please provide an email"
 *       404:
 *         description: User not found
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               message:
 *                type: string
 *                example: "User not found"
 *       500:
 *         description: Code could not be sent
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               message:
 *                type: string
 *                example: "Code could not be sent"
 *
 */

/**
 * @swagger
 * /api/auth/verify-code:
 *   post:
 *     summary: Verify code
 *     description: Verify code sent to user email to reset password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               code:
 *                 type: string
 *                 example: 1234
 *     responses:
 *       200:
 *         description: Code verified
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               message:
 *                type: string
 *                example: "Code verified"
 *       400:
 *         description: User forgot to provide a field, invalid code or code expired
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               message:
 *                type: string
 *                example: "Please provide an email and code"
 *       404:
 *         description: User not found
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               message:
 *                type: string
 *                example: "User not found"
 */

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset password
 *     description: Reset password with email and new password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               newPassword:
 *                 type: string
 *                 example: 1234
 *     responses:
 *       200:
 *         description: password reset successfully
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               message:
 *                type: string
 *                example: "Password reset successfully"
 *       400:
 *         description: User forgot to provide a field, code not verified or invalid email
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               message:
 *                type: string
 *                example: "Please provide an email and newPassword"
 *       404:
 *         description: User not found
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               message:
 *                type: string
 *                example: "User not found"
 */

router.post("/signup",signup);
router.post("/login",login);
router.post("/google",googleId);
router.post("/sendCode", sendCode);
router.post("/verifyCode", verifyCode);
router.post("/resetPassword", resetPassword);

export default router;