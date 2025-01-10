const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  reservation: { type: mongoose.Schema.Types.ObjectId, ref: "reservation" },
  amount: { type: Number, required: true },
  status: { type: String, required: true },
  description: { type: String },
  captureDetails: { type: Object },
});

module.exports = mongoose.model("payment", PaymentSchema);
