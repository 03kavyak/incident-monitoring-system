import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  AlertCircle,
  Clock3,
  CheckCircle2,
  XCircle,
  Plus,
  Search,
  Bell,
} from "lucide-react";

import IncidentForm from "./components/IncidentForm";
import IncidentCard from "./components/IncidentCard";

import "./App.css";

const API_URL = "http://localhost:5000";

const socket = io(API_URL);

function App() {
  const [incidents, setIncidents] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [priorityFilter, setPriorityFilter] = useState("All");

  const [notifications, setNotifications] = useState([]);

  const [showNotifications, setShowNotifications] = useState(false);

  // ==============================
  // LOAD INCIDENTS
  // ==============================

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const response = await fetch(`${API_URL}/api/incidents`);

      const data = await response.json();

      setIncidents(data);
    } catch (error) {
      console.error("Failed to fetch incidents:", error);
    }
  };

  // ==============================
  // SOCKET.IO
  // ==============================

  useEffect(() => {
    socket.on("incidentCreated", (incident) => {
      setIncidents((previous) => {
        const exists = previous.some((item) => item._id === incident._id);

        if (exists) {
          return previous;
        }

        return [incident, ...previous];
      });

      setNotifications((previous) => [
        `New incident: ${incident.title}`,
        ...previous,
      ]);
    });

    socket.on("incidentUpdated", (incident) => {
      setIncidents((previous) =>
        previous.map((item) => (item._id === incident._id ? incident : item)),
      );

      setNotifications((previous) => [
        `Updated: ${incident.title}`,
        ...previous,
      ]);
    });

    return () => {
      socket.off("incidentCreated");
      socket.off("incidentUpdated");
    };
  }, []);

  // ==============================
  // CREATE INCIDENT
  // ==============================

  const handleCreated = (incident) => {
    setIncidents((previous) => {
      const exists = previous.some((item) => item._id === incident._id);

      if (exists) {
        return previous;
      }

      return [incident, ...previous];
    });
  };

  // ==============================
  // UPDATE STATUS
  // ==============================

  const updateStatus = async (id, status) => {
    try {
      await fetch(`${API_URL}/api/incidents/${id}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          status,
        }),
      });
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  // ==============================
  // UPDATE PRIORITY
  // ==============================

  const updatePriority = async (id, priority) => {
    try {
      await fetch(`${API_URL}/api/incidents/${id}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          priority,
        }),
      });
    } catch (error) {
      console.error("Priority update failed:", error);
    }
  };

  // ==============================
  // ADD COMMENT
  // ==============================

  const addComment = async (id, text) => {
    try {
      await fetch(`${API_URL}/api/incidents/${id}/comments`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          user: "Kavya",
          text,
        }),
      });
    } catch (error) {
      console.error("Comment failed:", error);
    }
  };

  // ==============================
  // FILTER
  // ==============================

  const filteredIncidents = incidents.filter((incident) => {
    const searchMatch =
      incident.title.toLowerCase().includes(search.toLowerCase()) ||
      incident.description.toLowerCase().includes(search.toLowerCase());

    const statusMatch =
      statusFilter === "All" || incident.status === statusFilter;

    const priorityMatch =
      priorityFilter === "All" || incident.priority === priorityFilter;

    return searchMatch && statusMatch && priorityMatch;
  });

  // ==============================
  // COUNTS
  // ==============================

  const getCount = (status) =>
    incidents.filter((incident) => incident.status === status).length;

  return (
    <div className="app">
      {/* HEADER */}

      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">🚨</div>

          <div>
            <h1>Incident Monitor</h1>

            <p>Real-time incident tracking</p>
          </div>
        </div>

        <div className="topbar-right">
          <div className="notification-wrapper">
            <div
              className="notification-icon"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={21} />

              {notifications.length > 0 && <span>{notifications.length}</span>}
            </div>

            {showNotifications && (
              <div className="notification-panel">
                <div className="notification-header">
                  <strong>Notifications</strong>

                  <button onClick={() => setNotifications([])}>Clear</button>
                </div>

                {notifications.length === 0 ? (
                  <p className="no-notifications">No new notifications</p>
                ) : (
                  notifications.slice(0, 8).map((notification, index) => (
                    <div className="notification-item" key={index}>
                      <span>🔔</span>

                      <p>{notification}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="user">
            <div className="avatar">K</div>

            <div>
              <strong>Kavya</strong>
              <small>Developer</small>
            </div>
          </div>
        </div>
      </header>

      <main className="dashboard">
        {/* PAGE TITLE */}

        <div className="page-header">
          <div>
            <h2>Dashboard</h2>

            <p>Monitor and manage team incidents</p>
          </div>

          <button
            className="new-incident-btn"
            onClick={() => setShowForm(true)}
          >
            <Plus size={19} />
            New Incident
          </button>
        </div>

        {/* STAT CARDS */}

        <div className="stats-grid">
          <div className="stat-card open">
            <div className="stat-icon">
              <AlertCircle />
            </div>

            <div>
              <span>Open</span>
              <h3>{getCount("Open")}</h3>
            </div>
          </div>

          <div className="stat-card progress">
            <div className="stat-icon">
              <Clock3 />
            </div>

            <div>
              <span>In Progress</span>
              <h3>{getCount("In Progress")}</h3>
            </div>
          </div>

          <div className="stat-card resolved">
            <div className="stat-icon">
              <CheckCircle2 />
            </div>

            <div>
              <span>Resolved</span>
              <h3>{getCount("Resolved")}</h3>
            </div>
          </div>

          <div className="stat-card closed">
            <div className="stat-icon">
              <XCircle />
            </div>

            <div>
              <span>Closed</span>
              <h3>{getCount("Closed")}</h3>
            </div>
          </div>
        </div>

        {/* INCIDENT SECTION */}

        <section className="incident-section">
          <div className="section-header">
            <div>
              <h2>All Incidents</h2>

              <span>{filteredIncidents.length} incidents</span>
            </div>
          </div>

          {/* FILTER BAR */}

          <div className="filter-bar">
            <div className="search-box">
              <Search size={19} />

              <input
                placeholder="Search incidents..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>

              <option value="Open">Open</option>

              <option value="In Progress">In Progress</option>

              <option value="Resolved">Resolved</option>

              <option value="Closed">Closed</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="All">All Priority</option>

              <option value="Low">Low</option>

              <option value="Medium">Medium</option>

              <option value="High">High</option>

              <option value="Critical">Critical</option>
            </select>
          </div>

          {/* INCIDENT LIST */}

          <div className="incident-list">
            {filteredIncidents.length === 0 ? (
              <div className="empty-state">
                <AlertCircle size={40} />

                <h3>No incidents found</h3>

                <p>Create your first incident to get started.</p>
              </div>
            ) : (
              filteredIncidents.map((incident) => (
                <IncidentCard
                  key={incident._id}
                  incident={incident}
                  onStatusChange={updateStatus}
                  onPriorityChange={updatePriority}
                  onComment={addComment}
                />
              ))
            )}
          </div>
        </section>
      </main>

      {/* CREATE MODAL */}

      {showForm && (
        <IncidentForm
          onClose={() => setShowForm(false)}
          onCreated={handleCreated}
        />
      )}
    </div>
  );
}

export default App;
