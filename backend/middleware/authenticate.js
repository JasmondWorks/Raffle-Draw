const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Adjust the path to your User model as needed.

module.exports.authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  // Check if the `Authorization` header is present
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  // Extract the token from the `Authorization` header
  const token = authorization.split(" ")[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Find the user in the database
    const user = await User.findOne({ _id: decoded._id }).select("_id");

    if (!user) {
      return res.status(404).json({ error: "Invalid or non-existent token" });
    }

    // Attach user details to `req` for further processing
    req.user = user;

    // Pass control to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ error: "Invalid token or session expired" });
  }
};
