const express = require("express");
const {
  getResults,
  clearResults,
  addResult,
  getAllResults,
} = require("../controllers/resultsController");
const { validateId } = require("../middleware/validateId");

const router = express.Router();
router
  .route("/")
  .all(validateId("eventId", "Invalid event ID"))
  .get(getResults)
  .post(addResult);

router.route("/all").get(getAllResults);

router
  .route("/deleteAll")
  .post(validateId("eventId", "Invalid event ID"), clearResults);

module.exports = router;
