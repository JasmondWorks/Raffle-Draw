const mongoose = require("mongoose");

module.exports.validateId = (idField = "id", errorMessage = "Invalid ID") => {
  return (req, res, next) => {
    try {
      // Extract the ID from request parameters, query, or body
      const id = req.params[idField] || req.query[idField] || req.body[idField];

      // Validate the ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
          .status(400)
          .json({ error: errorMessage + " or is required" });
      }

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      res.status(400).json({
        error: `Could not validate ID: ${error.message}`,
      });
    }
  };
};
