const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  departement: {
    type: String,
    required: false,
  },
  faculty: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    required: false,
  },
  password: {
    type: String,
  },
  isAccepted: {
    type: Boolean,
    default: false,
  },
  googleId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("admin", adminSchema);
