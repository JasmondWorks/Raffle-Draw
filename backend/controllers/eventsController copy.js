const Event = require("../models/eventModel");

const normalizeOrganisationName = (name) => {
  // Check if the name is already in all uppercase
  if (name === name.toUpperCase()) {
    return name; // If it is in uppercase, leave it as is
  }
  return name.toLowerCase(); // If not, convert it to lowercase
};

const getEvents = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and 10 events per page

    // Ensure limit is a valid number
    const limitNumber = Number(limit) > 0 ? Number(limit) : 10;
    const pageNumber = Number(page) > 0 ? Number(page) : 1;

    // Calculate the number of documents to skip
    const skip = (pageNumber - 1) * limitNumber;

    // Query events with pagination, filtering by userId
    const events = await Event.find({ userId: req.user._id })
      .skip(skip)
      .limit(limitNumber);

    // Get the total count of events for this user
    const totalEvents = await Event.countDocuments({ userId: req.user._id });

    res.status(200).json({
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(totalEvents / limitNumber),
      totalEvents,
      data: events,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching events." });
  }
};

const getEvent = async (req, res) => {
  const { id } = req.params;

  const event = await Event.findById(id);

  if (event.userId !== req.user._id)
    return res.status(404).json({ error: "Could not find event" });

  if (!event) return res.status(400).json({ error: "Could not find event" });

  res.status(200).json(event);
};
const createEvent = async (req, res) => {
  try {
    let { title, numOfParticipants, organisationName, logoImage } = req.body;

    // Check for required fields
    if (!title || !numOfParticipants || !organisationName) {
      return res.status(400).json({ error: "All fields must be filled" });
    }

    // Normalize the organisation name: convert to lowercase if not all uppercase
    const normalizedOrganisationName =
      normalizeOrganisationName(organisationName);

    // Check if an event with the same organisationName already exists (case-insensitive)
    const existingEvent = await Event.findOne({
      organisationName: normalizedOrganisationName,
      userId: req.user._id,
    });

    if (existingEvent) {
      return res.status(400).json({
        error: "An event with this organisation name already exists",
        existingEvent,
      });
    }

    // Create the new event with the normalized organisation name
    const newEvent = new Event({
      title,
      numOfParticipants,
      logoImage,
      organisationName: normalizedOrganisationName,
      userId: req.user._id,
    });

    await newEvent.save(); // Save the new event to the database

    res.status(201).json(newEvent);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message + ". Error creating an event" });
  }
};

const editEvent = async (req, res) => {
  const { id } = req.params;

  const event = await Event.findOneAndUpdate(
    {
      _id: id,
    },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!event)
    return res.status(404).json({ error: "Could not find and edit event" });

  res.status(200).json({ data: event });
};
const deleteEvent = async (req, res) => {
  const { id } = req.params;

  const event = await Event.findOneAndDelete({ _id: id });

  if (!event)
    return res.status(404).json({ error: "Could not find and delete event" });

  res.status(200).json(event);
};

module.exports = { getEvents, getEvent, editEvent, createEvent, deleteEvent };
