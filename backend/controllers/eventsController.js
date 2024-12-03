const Event = require("../models/eventModel");

const getEvents = async (req, res) => {
    const events = await Event.find({});

  // console.log("all events");

  res.status(200).json(events);
};
const getEvent = async (req, res) => {
  res.json({ message: "get an event" });
};
const createEvent = async (req, res) => {
  const newEvent = {
    title: "New title",
    numOfParticipants: 300,
  };
  const createdEvent = await Event.create(newEvent);

  res.status(201).json(createEvent);
};

const editEvent = async (req, res) => {
  res.json({ message: "edit an event" });
};
const deleteEvent = async (req, res) => {
  res.json({ message: "delete an event" });
};

module.exports = { getEvents, getEvent, editEvent, createEvent, deleteEvent };
