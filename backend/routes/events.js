const express = require("express");
const {
  getEvents,
  getEvent,
  editEvent,
  createEvent,
  deleteEvent,
} = require("../controllers/eventsController");
const { validateId } = require("../middleware/validateId");
const { requireAuth } = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.route("/").get(getEvents).post(createEvent);
router
  .route("/:id")
  .all(validateId("id", "Invalid event ID"))
  .get(getEvent)
  .put(editEvent)
  .delete(deleteEvent);

module.exports = router;
