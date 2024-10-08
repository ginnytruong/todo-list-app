## README for Local Deployment:
Please note that while the application can be loaded locally, it still needs to be hosted and deployed for production use.

## Prerequisites:
Node.js and npm installed on your machine.

MySQL installed locally or accessible via a remote server.

.env file set up with your MySQL database credentials.

## Tech Stack Used:
Frontend: React.js, Tailwind CSS

Backend: Node.js, Express.js, MySQL

## Future Enhancements:
TypeScript Migration: Convert existing JavaScript codebase to TypeScript for improved type safety and developer experience.

Unit Testing: Implement unit tests to ensure code reliability and maintainability.

Authentication Layer: Integrate authentication mechanisms to secure user data and interactions.

Hosting & Deployment: Please note that while the application can be loaded locally, it still needs to be hosted and deployed for production use.

## Steps to Load the App Locally:
### Clone the Repository:
`git clone <repository-url>`
`cd <project-directory>`

### Install Dependencies:
`npm install`

## Set Up MySQL Database:
### Install MySQL:
1. If MySQL is not installed on your machine, download and install it from MySQL Downloads.
   
2. Access MySQL:
Open your MySQL client (e.g., MySQL Workbench, Sequel Pro, or command-line client).

3. Create Database:
Create a new database for the application. For example, in your MySQL client, run:
`CREATE DATABASE new_todo_app;`

4. Create User:
Create a new user and grant privileges to the database. Replace <your-mysql-user>, <your-mysql-password>, and <your-mysql-database> with your preferred credentials:
`CREATE USER '<your-mysql-user>'@'localhost' IDENTIFIED BY '<your-mysql-password>';`

`GRANT ALL PRIVILEGES ON new_todo_app.* TO '<your-mysql-user>'@'localhost';`

`FLUSH PRIVILEGES;`

## Set Environment Variables:
Create a .env file in the root directory of your project with the following content. Replace <your-mysql-user>, <your-mysql-password>, <your-mysql-database> with your MySQL credentials:

`DB_HOST=localhost
DB_USER=<your-mysql-user>
DB_PASSWORD=<your-mysql-password>
DB_DATABASE=<your-mysql-database>`

Ensure that you have already created a MySQL database with the specified name and granted access to the user.

## Run the Development Server:
`npm run dev`
This will start the development server at http://localhost:3000.

## Access the Application:
Open your web browser and go to http://localhost:3000 to access the locally deployed application.

## Usage:
Use the application as intended.
Test features and functionalities locally.

## Note:
The application is currently in the development stage and requires you to set up your own MySQL database and credentials for local deployment.
