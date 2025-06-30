import { generateToken, verifyToken } from "../utils/jwt.js";
import asyncHandler from "express-async-handler";
import customError from "../utils/customError.js";
import User from "../models/userModel.js";
import * as EmailValidator from "email-validator";
import sendEmail from "../utils/sendEmail.js";

const signup = asyncHandler(async (req, res, next) => {
  let { firstName, lastName, email, password } = req.body;

  firstName = firstName.trim();
  lastName = lastName.trim();
  email = email.trim();
  password = password.trim();

  if (!firstName || !lastName || !email || !password) {
    return next(new customError("Please provide all fields", 400));
  }

  if (password.length < 8) {
    return next(
      new customError("Password must be at least 8 characters long", 400)
    );
  }

  if (firstName.length < 2 || lastName.length < 2) {
    return next(
      new customError(
        "First name and last name must be at least 2 characters long",
        400
      )
    );
  }

  if (!EmailValidator.validate(email)) {
    return next(new customError("Please provide a valid email", 400));
  }

  const existUser = await User.findOne({ email });

  if (existUser) {
    return next(new customError("User already exists", 400));
  }

  const user = new User({
    firstName,
    lastName,
    email,
    password,
  });

  await user.save();

  const token = generateToken(user._id);

  res.status(201).json({
    status: "success",
    message: "User created successfully",
    token,
  });
});

const login = asyncHandler(async (req, res, next) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return next(new customError("Please provide email and password", 400));
  }

  email = email.trim();
  password = password.trim();

  if (EmailValidator.validate(email) === false) {
    return next(new customError("Please provide a valid email", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new customError("User not found", 404));
  }

  if (!user.password) {
    return next(new customError("Please login with Google", 400));
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return next(new customError("Incorrect password", 400));
  }

  const token = generateToken(user._id);

  res.status(200).json({
    status: "success",
    message: "User logged in successfully",
    token,
  });
});

const googleId = asyncHandler(async (req, res, next) => {
  let { googleId, firstName, lastName, email } = req.body;

  googleId = googleId.trim();
  email = email.trim();
  firstName = firstName.trim();
  lastName = lastName.trim();

  if (!googleId || !email || !firstName || !lastName) {
    return next(new customError("Please provide all fields", 400));
  }

  const existUser = await User.findOne({ email });

  if (existUser) {
    if (!existUser.googleId) {
      existUser.googleId = googleId;
      await existUser.save();
    }

    const token = generateToken(existUser._id);
    return res.status(200).json({ token });
  }

  const user = new User({
    firstName,
    lastName,
    email,
    googleId,
  });

  await user.save();

  const token = generateToken(user._id);

  res.status(201).json({ token });
});

const sendCode = asyncHandler(async (req, res, next) => {
  let { email } = req.body;
  email = email.trim();
  if (!email) {
    return next(new customError("Please provide an email", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new customError("User not found", 404));
  }

  const code = Math.floor(1000 + Math.random() * 9000);

  user.resetCode = code;
  user.resetCodeExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  await user.save();

  const options = {
    email,
    subject: "Reset Password Code",
    code,
  };

  try {
    await sendEmail(options);
    res.status(200).json({ message: "Code sent successfully" });
  } catch (err) {
    user.resetCode = undefined;
    user.resetCodeExpires = undefined;
    user.verifiedCode = false;
    await user.save();
    return next(new customError("Code could not be sent", 500));
  }
});

const verifyCode = asyncHandler(async (req, res, next) => {
  let { email, code } = req.body;

  email = email.trim();
  code = code.trim();

  if (!email || !code) {
    return next(new customError("Please provide email and code", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new customError("User not found", 404));
  }

  if (code !== user.resetPasswordCode) {
    return next(new customError("Invalid code", 400));
  }

  if (user.resetCodeExpires < Date.now()) {
    user.resetPasswordCode = undefined;
    user.resetCodeExpires = undefined;
    user.verifiedCode = false;
    await user.save();
    return next(new customError("Code has expired", 400));
  }

  user.verifiedCode = true;
  await user.save();
});

const resetPassword = asyncHandler(async (req, res, next) => {
  let { email, newPassword } = req.body;

  email = email.trimm();
  newPassword = newPassword.trim();

  if (!email || !newPassword) {
    return next(new customError("Please provide email and new password", 400));
  }

  if (newPassword.length < 8) {
    return next(
      new customError("Password must be at least 8 characters long", 400)
    );
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new customError("User not found", 404));
  }

  if (!user.verifiedCode) {
    return next(new customError("Please verify your code first", 400));
  }

  user.password = newPassword;
  user.resetCode = undefined;
  user.resetCodeExpires = undefined;
  user.verifiedCode = false;

  await user.save();
  res.status(200).json({ message: "Password reset successfully" });
});

export { signup, login, googleId, sendCode, verifyCode, resetPassword };
