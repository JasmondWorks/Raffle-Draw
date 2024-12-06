const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    eventId: { type: String, required: true },
    ticketNumber: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", resultSchema);
