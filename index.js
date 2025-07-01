import express from "express";
import dotenv from "dotenv";
import customError from "./utils/customError.js";
import globalErrorHandler from "./controllers/errorController.js";
import connectDB from "./config/db.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./config/swagger.js";
import cors from "cors";

import userRoute from "./routes/userRoute.js";
import expensesRoute from "./routes/expensesRoute.js";
import authRoute from "./routes/authRoute.js";

dotenv.config();

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const app = express();

// CORS setup
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/expenses", expensesRoute);

/* app.all("*", (req, res, next) => {
  next(new customError(`Can't find ${req.originalUrl} on this server!`, 404));
}); */

app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB();
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
