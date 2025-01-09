const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    location: {
      type: String,
      required: true,
    },
    cuisine: {
      type: String,
      required: true,
    },
    description: { type: String },
    reservationSlots: [Date],
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("restaurant", restaurantSchema);