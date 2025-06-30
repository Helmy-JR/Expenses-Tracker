import express from "express";
import {
  signup,
  login,
  google,
  sendCode,
  verifyCode,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();



router.post("/signup",signup);
router.post("/login",login);
router.post("/google",googleId);

router.post("/sendCode", sendCode);
router.post("/verifyCode", verifyCode);
router.post("/resetPassword", resetPassword);

export default router;