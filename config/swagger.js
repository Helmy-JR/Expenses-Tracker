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
        url: "http://localhost:3000", // Localhost URL
        description: "Local development server",
      },
      {
        url: "https://expenses-tracker-q9ja.onrender.com", // Deployed URL
        description: "Production server",
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
