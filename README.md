# User Management System and Mock Test API

## Project Description
This project is a RESTful API developed using Node.js, Express.js, and MongoDB. It provides two main functionalities:
1. **User Management System**: Handles user registration, login, account updates, deactivation, and super admin features.
2. **Mock Test Feature**: Allows users to take mock tests, ensuring no repeated questions and tracking answered questions.

## Features

### User Management System
- **User Registration**: A user can create an account using their name, email, password,state,gender and phone number.
- **Login**: Registered users can log in using their email and password.
- **User Profile**: Users can view and update their details (name, email, phone number).
- **Account Deactivation**: Users can deactivate their account (soft delete).
- **Super Admin**:
  - Super admin can log in and view the details of all users.
  - Super admin account is created manually (pre-seeded) for security.

### Mock Test Feature
- **Question Management**: Stores questions with unique IDs, options, and correct answers.
- **Test Creation**: Ensures users do not answer the same question within a single mock test.
- **Answer Tracking**: Tracks questions answered by each user across multiple mock tests.

---

## Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ORM
- **Validation**: Joi for input validation
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcrypt
- **Testing**: Postman

---

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB(Atlas)
### Create a .env file in the root directory and add the following environment variables:
- MONGO_URI=<your_mongodb_connection_string>

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ShravaniAnilPatil/Backend_Dev
   cd backend : npm start
   
