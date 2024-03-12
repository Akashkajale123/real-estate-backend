const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  userID: { type: String, unique: true },
  properties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }], // Reference to Property model
});

module.exports = mongoose.model("User", userSchema);
