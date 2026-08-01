# 🌾 Shetkari Agro – Agro Shop Inventory & Billing Management System

Shetkari Agro is a full-stack inventory and billing management system designed for agricultural shops. It helps shop owners efficiently manage products, categories, customers, billing, transactions, and inventory through a modern dashboard with real-time reports and analytics.

---

# 🚀 Live Demo

🌐 **Live Website:** Coming Soon

📂 **GitHub Repository:** https://github.com/Vedikaraut24/Shetkari-Agro

---

# 📌 Project Overview

Shetkari Agro is a web-based inventory management system developed to simplify the daily operations of agro product retailers.

The system enables shop owners to:

* Manage products and categories
* Maintain customer records
* Generate bills and invoices
* Track inventory levels
* Monitor sales and transactions
* View business reports through interactive dashboards

The project follows the **MERN Stack architecture** and demonstrates real-world business management features with secure authentication and RESTful APIs.

---

# ✨ Features

## 🔐 Secure Authentication

The application provides secure administrator authentication.

### Features

* Admin Login
* JWT Authentication
* Protected Routes
* Secure Password Storage
* Persistent Login Sessions

---

## 📦 Product Management

Manage all agricultural products with ease.

### Features

* Add Products
* Update Products
* Delete Products
* View Product List
* Product Search
* Product Categories
* Stock Quantity Management

Each product contains:

* Product Name
* Category
* Price
* Stock Quantity
* Description

---

## 🏷 Category Management

Organize products using categories.

Features include:

* Add Categories
* Edit Categories
* Delete Categories
* View Category List

---

## 👥 Customer Management

Maintain customer information.

Features include:

* Add Customers
* Update Customer Details
* Delete Customers
* View Customer History

Customer Information:

* Name
* Mobile Number
* Address

---

## 🧾 Billing System

Generate customer invoices quickly.

Billing Features:

* Create Bills
* Automatic Total Calculation
* Product-wise Billing
* Quantity Selection
* Printable Invoice
* Stock Auto Update

---

## 💰 Transaction Management

Track all financial activities.

Features:

* Sales History
* Recent Transactions
* Bill Records
* Payment Summary

---

## 📊 Dashboard & Reports

A modern dashboard provides complete business insights.

Reports include:

* Total Products
* Total Customers
* Total Bills
* Total Sales
* Inventory Value
* Monthly Sales Analysis
* Category-wise Product Distribution
* Top Selling Products
* Low Stock Alerts
* Recent Bills

---

## 📈 Data Visualization

Interactive charts help visualize business performance.

Charts include:

* Monthly Sales Chart
* Category Distribution Pie Chart
* Top Selling Products Chart
* Inventory Statistics

---

## ⚠ Low Stock Alerts

The system automatically identifies products with low inventory, helping shop owners restock products before they run out.

---

## 🌐 Responsive Dashboard

The application works smoothly on:

* Desktop
* Laptop
* Tablet
* Mobile Devices

---

# 🏗 Project Architecture

The project follows the **MVC (Model–View–Controller)** architecture.

## Backend

Responsible for:

* Authentication
* Business Logic
* REST APIs
* Database Operations

---

## Frontend

Developed using React with reusable components and responsive layouts.

---

## Database

MongoDB Atlas stores:

* Products
* Categories
* Customers
* Bills
* Transactions
* Users

---

# 🛠 Tech Stack

## Frontend

* React.js
* React Router
* Axios
* Tailwind CSS
* Bootstrap Icons
* React Hook Form
* React Toastify
* Chart.js / Recharts

---

## Backend

* Node.js
* Express.js

---

## Database

* MongoDB Atlas
* Mongoose

---

## Authentication

* JWT (JSON Web Token)
* bcrypt.js

---

## Other Libraries

* dotenv
* cors
* helmet
* morgan
* express-validator
* mongoose
* axios

---

# 🔐 Authentication & Authorization

The system uses JWT-based authentication.

Protected modules include:

* Dashboard
* Products
* Categories
* Customers
* Billing
* Reports
* Transactions

Only authenticated administrators can access the system.

---

# 📂 Project Structure

```text
Shetkari-Agro
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── layouts
│   │   ├── routes
│   │   ├── services
│   │   ├── context
│   │   ├── hooks
│   │   ├── utils
│   │   └── assets
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   ├── utils
│   ├── server.js
│
├── package.json
└── README.md
```

---

# ⚙ Environment Variables

Create a `.env` file inside the server directory.

```env
PORT=5000

MONGO_URI=

JWT_SECRET=
```

---

# 📦 Installation

Clone the repository

```bash
git clone https://github.com/Vedikaraut24/Shetkari-Agro.git
```

Move into the project directory

```bash
cd Shetkari-Agro
```

Install backend dependencies

```bash
cd server
npm install
```

Install frontend dependencies

```bash
cd ../client
npm install
```

Run Backend

```bash
cd server
npm run dev
```

Run Frontend

```bash
cd client
npm run dev
```

---

# 🚀 Future Enhancements

* Barcode Scanner Integration
* Supplier Management
* Purchase Management
* Export Reports to PDF & Excel
* SMS & WhatsApp Billing
* Multi-user Role Management
* Sales Prediction using Machine Learning
* AI-based Inventory Forecasting

---

# 📚 Learning Outcomes

This project helped me understand:

* MERN Stack Development
* RESTful API Development
* JWT Authentication
* MongoDB Data Modeling
* CRUD Operations
* Dashboard Design
* Inventory Management
* Billing System Development
* GST Invoice Generation
* Data Visualization
* Role-based Access Control
* Full Stack Project Deployment

---

# 👩‍💻 Author

**Vedika Krupasagar Raut**

* 🎓 B.Tech CSE Student
* 📍 Prof. Ram Meghe Institute of Technology & Research
* 💻 MERN Stack Developer

**GitHub:** https://github.com/Vedikaraut24

---

# ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub. Your support is greatly appreciated!
