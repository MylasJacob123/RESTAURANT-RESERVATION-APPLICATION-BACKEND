const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    cuisine: { type: String, required: true },
    description: { type: String, default: "" },
    reservationSlots: [
      {
        date: { type: Date, required: true },
        slots: { type: Number, required: true },
      },
    ],
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
      required: true,
    },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("restaurant", restaurantSchema);
