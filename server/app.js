const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

const Incident = require("./models/Incident");

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH"],
  },
});

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));


// GET ALL INCIDENTS
app.get("/api/incidents", async (req, res) => {
  try {
    const incidents = await Incident.find().sort({ createdAt: -1 });
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// CREATE INCIDENT
app.post("/api/incidents", async (req, res) => {
  try {
    const incident = await Incident.create(req.body);

    io.emit("incidentCreated", incident);

    res.status(201).json(incident);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// UPDATE INCIDENT
app.patch("/api/incidents/:id", async (req, res) => {
  try {
    const incident = await Incident.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!incident) {
      return res.status(404).json({
        message: "Incident not found",
      });
    }

    io.emit("incidentUpdated", incident);

    res.json(incident);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// ADD COMMENT
app.post("/api/incidents/:id/comments", async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);

    if (!incident) {
      return res.status(404).json({
        message: "Incident not found",
      });
    }

    incident.comments.push({
      user: req.body.user || "Developer",
      text: req.body.text,
    });

    await incident.save();

    io.emit("incidentUpdated", incident);

    res.json(incident);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

app.get("/", (req, res) => {
  res.json({
    message: "Incident Monitoring API is running",
  });
});

// SOCKET.IO
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
