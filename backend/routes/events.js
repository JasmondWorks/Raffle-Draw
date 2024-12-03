const express = require("express");
const {
  getEvents,
  getEvent,
  editEvent,
  createEvent,
  deleteEvent,
} = require("../controllers/eventsController");
const router = express.Router();

router.route("/").get(getEvents).post(createEvent);
router.route("/:id").get(getEvent).put(editEvent).delete(deleteEvent);

module.exports = router;
