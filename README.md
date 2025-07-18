# 📊 Expenses Tracker API

A secure and extensible RESTful API built with Node.js and Express that helps users track their daily spending, view summaries, and manage their financial habits.

---

## 🚀 Features

- 🔐 **Authentication & Authorization**
  - Register and login with email or Google
  - JWT-based protected routes
  - Password reset via email verification

- 💸 **Expense Management**
  - Create, update, delete, and view expenses
  - Retrieve last 5 expenses
  - Get total money spent
  - View category-based summaries and top spending areas

- 📊 **Analytics**
  - Most-used category in the last 3 months
  - Highest spent category
  - Last-month summary by category
  - Overall spending summary

- 👤 **User Management**
  - Get, update, and delete user profile

- 📘 **API Documentation**
  - Fully documented with Swagger (OpenAPI 3.0)

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT + Bcrypt
- **Validation:** Joi
- **API Docs:** Swagger
- **Deployment:** Render

---

## 📂 API Documentation

The full list of available endpoints (Authentication, Expenses, and User) is documented and can be explored interactively here:

👉 **[View API Docs (Swagger UI)](https://expenses-tracker-q9ja.onrender.com/api-docs/)**

---

## 📄 Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
MONGO_URI=
JWT_SECRET=
JWT_EXPIRES_IN=
EMAIL_USERNAME=
EMAIL_PASSWORD=
EMAIL_HOST=
EMAIL_PORT=
CLIENT_URL=
```

> **Note:** Never commit your `.env` file to version control. Use `.env.example` if needed.

---

## 🧪 API Testing

You can test all endpoints directly through Swagger UI:

🔗 [`https://expenses-tracker-q9ja.onrender.com/api-docs/`](https://expenses-tracker-q9ja.onrender.com)

Or use your favorite API client (e.g., Postman, Thunder Client).  
Most endpoints require a Bearer token for authentication.

---

## 💻 Local Development Setup

```bash
# Clone the repo
git clone https://github.com/your-username/expenses-tracker-api.git
cd expenses-tracker-api

# Install dependencies
npm install

# Create a .env file and add required variables

# Start the server (development)
npm run dev

# Server runs at http://localhost:3000
```

---

## ☁️ Deployment

[![Deployed on Render](https://img.shields.io/badge/Deployed%20on-Render-00c7b7?style=for-the-badge&logo=render&logoColor=white)](https://expenses-tracker-q9ja.onrender.com)

This project is deployed on [Render](https://render.com).  
Environment variables can be configured through the Render dashboard.

Live API: **[`https://expenses-tracker-q9ja.onrender.com`](https://expenses-tracker-q9ja.onrender.com)**

---

## 👤 Author

**Abdelrahman Helmy**  
Feel free to connect from [HERE](https://linktr.ee/helmy_jr)