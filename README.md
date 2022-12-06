# SE3309_2022_Assignment_4

This repository contains 2 folders to be used to manage your final project assignment. 

The APP folder is where you should commit all the code for your web application. 

The DUMP folder should contain the database .dump file required to re-create your database and ALL of it's data. 

# How To Run This Project
## Setting up the database
1. Import dump.sql file into a schema called ```"se3316_assignment4_database"```.
2. Navigate to the file in ```"src/backend/DBConnect.js"``` and change the sql connection information to match your local MySQL setup.

## Running the backend api for interacting with the database
1. Open a terminal and navigate to ```"src/backend"```.
2. Run the following command to install packages: ```"npm install"```.
3. Run the following command to start the server: ```node server.js```.
4. Ensure ```Listening on Port 9000``` appears in the console.

## Running the React frontend
1. Open a new terminal and navigate to ```"src/frontend"```.
2. Run the following command to install packages: ```"npm install"```.
3. Run the following command to start the server: ```npm start```.
4. A browser window should open for ```"http://localhost:3000```. If this didn't happen try navigating there manually.


