const app = require("./app");
const mongoose = require("mongoose");

const connectDb = require("./config/db");
const PORT = process.env.PORT || 5000;

// MongoDB Connection
connectDb();

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
