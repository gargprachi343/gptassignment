Events Management – Frontend

This is a React-based events management dashboard built as part of an assignment.
The focus of the project is role-based access, state management, and a clean dashboard-style UI.

The application works completely on the frontend using mock data — no backend server is required.

Project Overview

The app allows users to log in as either an Admin or a User and interact with an events dashboard.

Admin users can create and delete events

Normal users can view and filter events

The UI follows a three-column dashboard layout with a sidebar, main content area, and a stats panel

The goal was to simulate a real-world events management system while keeping the setup simple and easy to run.

Tech Stack

React (18)

Context API for global state management

Tailwind CSS for styling

LocalStorage for session persistence

Hardcoded mock data (no backend)

Project Structure
src/
├── app/
│   └── App.jsx
├── components/
│   ├── auth/
│   │   ├── LoginPortal.jsx
│   │   └── RoleBadge.jsx
│   ├── common/
│   │   ├── Sidebar.jsx
│   │   ├── TopBar.jsx
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   └── Loader.jsx
│   └── events/
│       ├── EventList.jsx
│       ├── EventCard.jsx
│       ├── EventFilters.jsx
│       └── CreateEventModal.jsx
├── context/
│   ├── AuthContext.jsx
│   └── EventContext.jsx
├── services/
│   ├── authService.js
│   ├── eventsService.js
│   ├── mongoService.js
│   └── mockData.js
├── pages/
│   └── Dashboard.jsx
├── styles/
│   └── index.css
└── utils/
    ├── constants.js
    ├── dateUtils.js
    └── validators.js

How to Run the Project
Prerequisites

Node.js (v14 or higher)

npm

Steps
npm install
npm start


The app will run at:

http://localhost:3000


No backend setup is required.

Authentication (Mocked)

Authentication is handled entirely on the frontend using mock data.

Test Accounts
Role	Email	Password
Admin	admin@example.com
	admin123
User	prachi.garg@example.com
	password123
User	john.doe@example.com
	test123

Session state is stored in localStorage, so users stay logged in on refresh.

Features
Login & Roles

Login page with role selection

Different permissions for Admin and User

Logout clears session state

Events

View all events in a grid layout

Filter events by category and time (upcoming / past)

Admin-only event creation

Admin-only delete with confirmation

UI

Three-column layout (sidebar, main content, stats panel)

Sidebar navigation with active state

Top bar with search input and notification icons

Responsive layout for smaller screens

Mock Data

All data is stored in src/services/mockData.js.

This includes:

Users

Events

Notifications

Messages

Favorites

User settings

The data is stored in memory, so changes persist only during the session.

The service layer (authService, eventsService, mongoService) abstracts data access, making it easy to replace mock data with real API calls later.

State Management

AuthContext

Manages login state and user role

Exposes helper flags like isAdmin and isAuthenticated

EventContext

Stores events list

Handles filtering, creation, and deletion

Manages loading and error states

Styling

Built with Tailwind CSS

Warm color palette (red, orange, peach tones)

Simple dashboard-style design

Focus on readability and spacing rather than animations

Limitations & Future Improvements

Things that were intentionally kept simple or left out:

No real backend or database

Search functionality is UI-only

Notifications and messages are mocked

No detailed event view page

Possible future improvements:

Connect to a real backend

Add event detail pages

Implement search and pagination

Persist data using a database

Notes

This project is frontend-only by design

Mock data is used to keep setup simple

Code is organized to allow easy backend integration later

Built for learning and evaluation purposes

Build for Production
npm run build

License

This project was created for academic / evaluation purposes.
