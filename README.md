# Real-Time Incident & Bug Monitoring System

A web-based incident management application that helps development teams report, track, assign, and resolve software bugs in real time. The system uses Socket.IO to broadcast incident updates to connected users without requiring a page refresh.

## Features

- **Incident Management:** Create incidents with a title, description, priority, and assignee.
- **Status Tracking:** Track incidents through Open, In Progress, Resolved, and Closed.
- **Priority Management:** Categorize incidents as Low, Medium, High, or Critical.
- **Real-Time Updates:** Broadcast incident creation and updates to connected clients using Socket.IO.
- **Comments:** Add comments to incidents for discussion and updates.
- **Dashboard:** View incident counts and status summaries.
- **Search and Filters:** Find incidents by title or description and filter by status or priority.
- **Notifications:** Display notifications for new and updated incidents.
- **Responsive Interface:** Built with React and CSS for a user-friendly interface.

## Tech Stack

**Frontend**
- React
- Vite
- JavaScript
- CSS
- Socket.IO Client
- Lucide React

**Backend**
- Node.js
- Express.js
- Socket.IO

**Database**
- MongoDB
- Mongoose

## Project Structure

```text
incident-monitoring-system/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── IncidentCard.jsx
│   │   │   └── IncidentForm.jsx
│   │   ├── App.jsx
│   │   └── ...
│   ├── package.json
│   └── ...
├── server/
│   ├── models/
│   │   └── Incident.js
│   ├── app.js
│   ├── package.json
│   └── ...
├── .gitignore
└── README.md
```

## Prerequisites

Install the following before running the application:

- Node.js and npm
- MongoDB running locally, or a MongoDB Atlas database
- Git

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/03kavyak/incident-monitoring-system.git
cd incident-monitoring-system
```

### 2. Configure the backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory:

```env
MONGO_URI=your_mongodb_connection_string
```

Replace the placeholder with your actual MongoDB connection string. For MongoDB Atlas, use the connection string provided by your cluster.

Start the backend using the script configured in `server/package.json`, for example:

```bash
npm run dev
```

If the project does not define a `dev` script, use the available script listed in `server/package.json`.

The backend runs on `http://localhost:5000` when configured for the default port.

### 3. Configure the frontend

Open a second terminal from the project root:

```bash
cd client
npm install
npm run dev
```

Open the local URL printed by Vite, usually:

`http://localhost:5173`

Keep both the backend and frontend terminals running while using the application.

## How It Works

1. A developer creates an incident through the React interface.
2. Express receives the request and stores the incident in MongoDB.
3. Socket.IO broadcasts incident creation and update events to connected clients.
4. Connected users receive updates without manually refreshing the page.
5. Users can change incident status or priority, add comments, and filter incidents from the dashboard.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/incidents` | Retrieve incidents |
| POST | `/api/incidents` | Create an incident |
| PATCH | `/api/incidents/:id` | Update an incident |
| POST | `/api/incidents/:id/comments` | Add a comment |

## Environment Variables and Security

- Keep your real MongoDB connection string in `server/.env`.
- Never commit `.env` files, passwords, database credentials, or other secrets.
- Confirm that `.env` is included in `.gitignore`.
- The current project is a development-focused implementation. Authentication, role-based permissions, production deployment configuration, and additional security hardening may be added in future versions.

## Future Enhancements

- User authentication and role-based access control
- Incident reassignment and team management
- Email or push notifications
- Incident history and audit logs
- Production deployment and automated testing

## Author

**Kavya K**

GitHub: [03kavyak](https://github.com/03kavyak)

---

Built to explore real-time communication, REST APIs, database integration, and incident management using the MERN ecosystem and Socket.IO.