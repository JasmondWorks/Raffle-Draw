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

app.get("/api/v1", (_, res) => {
  res.status(200).json("Home route");
});
// Routes
app.use("/api/v1/events", eventsRoute);
app.use("/api/v1/results", resultsRoute);
app.use("/api/v1/users", usersRoute);

const connectDb = require("./config/db");
const PORT = process.env.PORT || 5000;

// MongoDB Connection
connectDb();

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
