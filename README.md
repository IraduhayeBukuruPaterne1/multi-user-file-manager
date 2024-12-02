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

**Steps to Set Up and Run the Project** 

**Steps to Set Up and Run the Project**

Navigate to the Project Directory

cd multilingual-file-manager


**Install Dependencies**

npm install

**Configure Environment Variables Create a .env file in the project root with the following content:**

DB_HOST=your_database_host

DB_USER=your_database_user

DB_PASSWORD=your_database_password

DB_NAME=your_database_name

REDIS_HOST=your_redis_host

REDIS_PORT=your_redis_port


**Run Database Migrations (if applicable)**

npm run migrate

**2. Start the Application** 



npm start


**Usage**
**Register a New User**


**Endpoint: /register**

Create a new account by providing a username, email, and password.
**Log In** 


Endpoint: /login


**Authenticate and receive a token for secure access.**

**Manage Files**


Perform file and directory operations:

Create, read, update, delete files.

Organize files into directories.


**Change Language**


Endpoint: /language


Update your preferred language to customize the user interface.

**Upload Files**

**Endpoint: /upload**

Upload files and track progress through the provided API routes.

**Testing**
Run the following command to execute unit tests:

npm test

**Test Coverage**
The test suite includes:
User authentication functionality.
File CRUD operations.
Queuing system functionality.

**Challenges and Solutions**

Developing the Multilingual File Manager Application presented several challenges that required innovative solutions. One major hurdle was handling concurrent file uploads efficiently without overloading the server. To address this, we integrated Redis with a queuing system, ensuring smooth processing and tracking of multiple file uploads simultaneously. Another significant challenge was implementing dynamic internationalization (i18n) across the application. This required designing middleware capable of detecting user-selected languages and applying them in real time. By leveraging the i18next library, we created a seamless multilingual experience for users, enhancing global accessibility. These solutions not only improved the application’s performance but also contributed to a more user-friendly interface.



![Screenshot 2024-12-01 222237](https://github.com/user-attachments/assets/0d1b71bc-35fa-4a05-98df-9c3e79923c42)

![Screenshot 2024-12-01 222310 (1)](https://github.com/user-attachments/assets/47b121ea-0522-451d-ad94-c5ee4466c72f)

