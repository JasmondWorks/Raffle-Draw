require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const eventsRoute = require("./routes/events");
const resultsRoute = require("./routes/results");
const usersRoute = require("./routes/users");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/events", eventsRoute);
app.use("/api/v1/results", resultsRoute);
app.use("/api/v1/users", usersRoute);

module.exports = app;
