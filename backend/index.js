require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const eventsRoute = require("./routes/events");
const PORT = process.env.PORT || 8000;

const cors = require("cors");
app.use(cors());

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/v1/events", eventsRoute);

// connect to db
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    // listen for requests
    app.listen(PORT, () =>
      console.log(`connected to db & listening on ${PORT}`)
    );
  })
  .catch((error) => console.log(error));
