import swaggerJSDoc from "swagger-jsdoc";
import dotenv from "dotenv";

dotenv.config();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Expenses Tracker API",
      version: "1.0.0",
      description: "API documentation for the Expenses Tracker application",
    },
    servers: [
      {
        url: process.env.BASE_URL || "https://expenses-tracker-q9ja.onrender.com/",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"], // You can change this pattern as needed
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;
