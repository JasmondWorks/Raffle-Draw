const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    numOfParticipants: {
      type: Number,
      required: true,
    },
    // logo: {
    //   type: String,
    //   required: false,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
