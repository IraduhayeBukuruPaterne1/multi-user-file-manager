# Multilingual File Manager Application

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation and Setup](#installation-and-setup)
5. [Usage](#usage)
6. [Testing](#testing)
7. [Challenges and Solutions](#challenges-and-solutions)
8. [Future Enhancements](#future-enhancements)

---

## Project Overview

The **Multilingual File Manager Application** is a backend project built using **Node.js**. It simulates a collaborative workspace where multiple users can securely manage files. The app supports user authentication, multilingual user interfaces, asynchronous file handling, and unit-tested core functionalities.

### Key Objectives
- Develop a secure and robust backend application.
- Demonstrate proficiency in Node.js and database interactions.
- Implement multilingual support for global accessibility.
- Handle asynchronous tasks using Redis for file management.
- Write comprehensive unit tests to ensure code quality.

---

## Features

- **User Authentication**: Secure registration and login with hashed passwords.
- **File Management**: Create, read, update, delete files, and organize directories.
- **Multilingual Support**: Choose from multiple languages for the user interface.
- **Asynchronous Task Handling**: Efficient file uploads with progress tracking using Redis.
- **Unit Testing**: Ensure reliability of core functionalities with Jest/Mocha.

---

## Technologies Used

- **Node.js**: Backend framework for building scalable applications.
- **Express.js**: Simplified server setup and routing.
- **MySQL/MongoDB**: Database for storing user data and file metadata.
- **Redis**: Queuing system for managing asynchronous tasks.
- **i18next**: Library for multilingual support.
- **bcrypt**: Secure password hashing.
- **Jest/Mocha**: Testing frameworks for unit tests.

---

## Installation and Setup

### Prerequisites
-** Node.js installed on your machine .
- MySQL or MongoDB installed and configured.
- Redis server installed.

## Steps to Set Up and Run the Project

### 1. Navigate to the Project Directory
Installation and Setup
Prerequisites
Ensure the following are installed:

**Node.js**

**MySQL or MongoDB**

**Redis server**

Steps to Set Up and Run the Project
Navigate to the Project Directory


cd multilingual-file-manager
Install Dependencies

npm install
Configure Environment Variables
Create a .env file in the project root and add:

env
DB_HOST=your_database_host  
DB_USER=your_database_user  
DB_PASSWORD=your_database_password  
DB_NAME=your_database_name  
REDIS_HOST=your_redis_host  
REDIS_PORT=your_redis_port  
Run Database Migrations (if applicable)

npm run migrate
Start the Application


npm start
Usage
**Redis server**

Use the /register endpoint to create a new account.

2. Log In
Authenticate your account via the /login endpoint.

3. Manage Files
Perform the following operations:

Create, read, update, and delete files and directories.
4. Change Language
Select your preferred language using the /language endpoint.

5. Upload Files
Upload files and monitor progress with the provided API routes.

Testing
Run Unit Tests
Execute the following command:

bash
Copy code
npm test
Test Coverage
Tests include:

User authentication.
File CRUD operations.
Queuing system functionalities.

**Challenges and Solutions**

**1. Handling Concurrent File Uploads**

Challenge: Managing multiple simultaneous uploads without overloading the server.
Solution: Integrated Redis queuing for efficient processing.
2. Implementing Dynamic i18n
Challenge: Applying internationalization dynamically across the app.
Solution: Designed middleware to detect and apply user-selected languages in real-time.
Future Enhancements
Add real-time notifications for file-related events.
Implement role-based access control for file management.
Expand multilingual support to more languages.

![Screenshot 2024-12-01 222237](https://github.com/user-attachments/assets/0d1b71bc-35fa-4a05-98df-9c3e79923c42)

![Screenshot 2024-12-01 222310 (1)](https://github.com/user-attachments/assets/47b121ea-0522-451d-ad94-c5ee4466c72f)

