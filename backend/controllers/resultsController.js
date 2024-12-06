const Result = require("../models/resultModel");
const Event = require("../models/eventModel");

const getAllResults = async (req, res) => {
  try {
    const { eventId } = req.query; // Accessing eventId from query params

    if (!eventId) {
      return res.status(400).json({ error: "Event ID is required." });
    }

    // Query results with pagination
    const results = await Result.find({ eventId });

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching results." });
  }
};
const getResults = async (req, res) => {
  try {
    const { eventId } = req.query; // Accessing eventId from query params
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and 10 results per page

    if (!eventId) {
      return res.status(400).json({ error: "Event ID is required." });
    }

    // Calculate the number of results to skip
    const skip = (page - 1) * limit;

    // Query results with pagination
    const results = await Result.find({ eventId })
      .skip(skip)
      .limit(Number(limit));

    // Get the total count of results for the event
    const totalResults = await Result.countDocuments({ eventId });

    res.status(200).json({
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(totalResults / limit),
      totalResults,
      data: results,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching results." });
  }
};

const addResult = async (req, res) => {
  try {
    const { eventId, ticketNumber } = req.body;

    const newResult = await Result.create({
      eventId,
      ticketNumber,
    });

    res.status(200).json({ data: newResult });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const clearResults = async (req, res) => {
  try {
    const { eventId } = req.body;

    // Find the results associated with the event
    const results = await Result.find({ eventId });

    if (!results.length)
      return res.status(400).json({ error: "No results found to delete" });

    // Delete all results for the given eventId
    const deleteResult = await Result.deleteMany({ eventId });

    res.status(200).json({
      message: "Results cleared successfully and numbersLeft reset.",
      deletedCount: deleteResult.deletedCount,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while clearing results." });
  }
};

module.exports = { getResults, addResult, clearResults, getAllResults };
