Learning Management Platform – Frontend

This is the frontend of the Learning Management Platform, built using React.js.
It provides an interface for learners and instructors to take quizzes, view scores, manage quizzes, and track learning progress.

Tech Stack:

React.js (Frontend Framework)

CSS3 for Styling

React Router DOM for Routing

React Hooks and Local Storage for State Management

Node.js + Express (Backend API)

MongoDB (Database)

Setup Instructions:

Navigate to the frontend folder:
cd frontend

Install dependencies:
npm install

Start the development server:
npm start

Then open http://localhost:3000
 in your browser.

Folder Structure:
frontend/
├── src/
│ ├── pages/
│ │ ├── LoginPage.js
│ │ ├── Register.js
│ │ ├── LearnerDashboard.js
│ │ ├── InstructorDashboard.js
│ │ ├── QuizStart.js
│ │ ├── QuizResult.js
│ │ ├── QuizHistory.js
│ │ ├── PreviewQuiz.js
│ │ └── ManageQuiz.js
│ ├── App.js
│ ├── App.css
│ ├── index.js
│ ├── index.css
│ ├── Layout.js
│ ├── ProtectedRoute.js
│ └── reportWebVitals.js
├── package.json
├── package-lock.json
├── README.md
└── .gitignore

Environment Variables:
Create a file named .env in the frontend folder with the following line:
REACT_APP_API_URL=http://localhost:5000

Features:

Login and Register for learners and instructors

Quiz participation and score tracking

Learner quiz history

Instructor quiz creation, preview, and management

Adaptive quiz generation

Clean dashboard layout for both user roles

Useful Commands:
npm start – Run development server
npm run build – Create production build
npm test – Run tests

Backend Connection:
Ensure the backend (Node.js + Express) runs on http://localhost:5000
 before starting the frontend.
APIs used:

/api/auth/login

/api/auth/register

/api/quiz

/api/history

Author:
Saksham Khanna
GitHub: https://github.com/Saksham-Khanna

LinkedIn: https://www.linkedin.com/in/sakshamm-khanna29/
