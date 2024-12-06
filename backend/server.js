const app = require("./app");

const connectDb = require("./config/db");
const PORT = process.env.PORT || 5000;

// MongoDB Connection
connectDb();

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
