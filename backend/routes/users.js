const express = require("express");
const { signinUser, signupUser } = require("../controllers/usersController.js");
const { authenticate } = require("../middleware/authenticate.js");
const router = express.Router();

// login route
router.post("/signin", signinUser);

// signup route
router.post("/signup", signupUser);

// authenticate route
router.get("/authenticate", authenticate, (req, res) => {
  res
    .status(200)
    .json({ message: "User authenticated successfully", user: req.user });
});

module.exports = router;
