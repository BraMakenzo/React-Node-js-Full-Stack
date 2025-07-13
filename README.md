# React-Node.js Full Stack User Management App

This project is a full stack user management application built with React.js (frontend), Node.js + Express (backend), and PostgreSQL database. It implements basic CRUD functionality and simple hardcoded authentication.

---

## Features

- **User Authentication:** Simple login with hardcoded username and password.
- **User CRUD:** Create, Read, Update, Delete user records.
- **Search:** Filter users by name.
- **Responsive UI:** Styled and user-friendly React frontend.
- **Backend API:** RESTful API built with Express.js.
- **Database:** PostgreSQL for persistent data storage.

---

## Technologies Used

- Frontend: React.js, Axios, React Router
- Backend: Node.js, Express.js, PostgreSQL, `pg` library
- Styling: CSS modules

---

## Getting Started

### Prerequisites

- Node.js and npm installed
- PostgreSQL installed and running
- Git installed

### Backend Setup

1. Navigate to the backend folder:
    ```bash
    cd backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create PostgreSQL database and user table (use provided SQL scripts in `SQL` folder).
4. Update database connection settings in `server.js` as needed.
5. Start backend server:
    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend folder:
    ```bash
    cd user-display
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start frontend:
    ```bash
    npm start
    ```
4. Open browser at [http://localhost:3000](http://localhost:3000)

---

## Usage

- Log in with the hardcoded credentials:
    - Username: `admin`
    - Password: `password123`
- After login, you can add, edit, delete, and search users.
- Date fields are handled in `YYYY-MM-DD` format.
- Feedback messages appear for user actions.

---

## Project Structure

