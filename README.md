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
- Node.js installed on your machine.
- MySQL or MongoDB installed and configured.
- Redis server installed.

## Steps to Set Up and Run the Project

### 1. Navigate to the Project Directory
```bash
cd multilingual-file-manager
2. Install Dependencies
bash

npm install
3. Configure Environment Variables
Create a .env file in the project root and add the following variables:

env

DB_HOST=your_database_host  
DB_USER=your_database_user  
DB_PASSWORD=your_database_password  
DB_NAME=your_database_name  
REDIS_HOST=your_redis_host  
REDIS_PORT=your_redis_port  
4. Run Database Migrations (if applicable)
bash

npm run migrate
5. Start the Application
bash

npm start

Usage

1. Register a New User
Use the /register endpoint to create a new account.

2. Log In

Authenticate your account through the /login endpoint.

3. Manage Files

Perform file and directory operations:

Create, read, update, and delete files and directories in your workspace.
4. Change Language
Update your preferred language through the /language endpoint.

5. Upload Files

Upload files and track their progress using the provided API routes.

Testing

To execute unit tests, run the following command:
bash

npm test

Test Coverage

The tests include the following functionalities:

User authentication

File CRUD operations

Queuing system functionality
vbnet


### Key Points to Maintain Formatting:  
- **Paste into a Plain Text Area**: Ensure you're pasting this into a markdown editor or a plain-text-compatible section of your project (e.g., a `README.md` file).  
- **Preview in Markdown-Compatible Tool**: If you’re on GitHub or another Markdown-supporting platform, the formatting will appear exactly as intended.  

Challenges and solutions 

Handling Concurrent File Uploads

One of our key challenges was managing multiple simultaneous file uploads without overloading the server. We overcame this by integrating Redis with a queuing system to process uploads efficiently.

Implementing Dynamic i18n
Another challenge was applying internationalization dynamically across the application. To address this, we designed middleware that detects and applies user-selected languages in real time.”
