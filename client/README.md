# 🚨 Real-Time Incident Monitoring System

A real-time web application for reporting, monitoring, assigning, and resolving software bugs and incidents across a development team.

## Features

* Create and report incidents
* Real-time incident updates using Socket.IO
* Incident status management
* Priority management
* Developer assignment
* Real-time comments
* Live incident dashboard
* Search incidents
* Filter by status
* Filter by priority
* Real-time notifications
* Responsive interface

## Tech Stack

### Frontend

* React
* Vite
* JavaScript
* Axios
* Socket.IO Client
* Lucide React

### Backend

* Node.js
* Express.js
* Socket.IO
* MongoDB
* Mongoose

## Incident Status

* Open
* In Progress
* Resolved
* Closed

## Priority Levels

* Low
* Medium
* High
* Critical

## Project Structure

```text
incident-monitoring-system/
├── client/
│   └── React frontend
│
└── server/
    ├── models/
    ├── app.js
    └── .env
```

## Running the Project

### Backend

```bash
cd server
npm install
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## Real-Time Architecture

The application uses Socket.IO to broadcast incident creation, status updates, priority changes, and comments to all connected team members without requiring a page refresh.

```text
React Client
     │
     ▼
Express API
     │
     ├── MongoDB
     │
     └── Socket.IO
             │
       ┌─────┴─────┐
       ▼           ▼
    Developer   Developer
       A            B
```

## Future Improvements

* JWT authentication
* Role-based access control
* Email notifications
* Incident detail pages
* File attachments
* Activity history
* Advanced analytics
* Deployment with Docker
* Production monitoring
