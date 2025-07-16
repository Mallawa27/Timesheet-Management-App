Timesheet Application
Live Demo
https://timesheet-management-app-eight.vercel.app/

Setup Instructions
Follow these steps to get the project up and running on your local machine:

1. Clone the repository:
    git clone https://github.com/Mallawa27/Timesheet-Management-App/edit/main/README.md

2. Navigate into the project directory:
   bash
    cd your-timesheet-management-app
   
4.  Install dependencies:
    npm install
 
5. Start the development server:
   npm run dev
   
7.  The application should now be running on http://localhost:5173 or another port 

Login Credentials (for testing):
Email: user@example.com
Password:password123

 Frameworks/Libraries Used:
 1)React: Frontend JavaScript library for building user interfaces.
 2)Vite: Fast build tool for modern web projects.
 3)React Router DOM:For declarative routing in React applications.
 4)Tailwind CSS: A utility-first CSS framework for rapidly styling the application.
 5)JavaScript : The core programming language and for validations of the form.
 6)HTML5 and CSS: Standard web technologies.

Notes and Assumptions:
Mock API: This application uses a local src/mockDb.js file to simulate a backend API. All data (users, timesheets, entries) is stored in memory within this file and is not persistent across browser sessions. This was done to demonstrate API integration without requiring a separate backend server setup.
Authentication: User authentication is simulated. The token passed around is a dummy token 
Error Handling: Basic error handling and loading states are implemented for API calls.
Add New Task" Button:The functionality for the "+ Add new task" button on the ViewTimesheet page is currently a placeholder .

Time Spent:
Approximately: 17 Hours
