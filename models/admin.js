const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // add other fields as required
});

module.exports = mongoose.model("admin", adminSchema);
