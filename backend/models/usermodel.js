const mongoose = require("mongoose");

const userDetailSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },

  fullName: {
    type: String,
    required: true,
    trim: true
  },

  profilePhoto: {
    type: String,
    default: null // image URL
  },

  bio: {
    type: String,
    trim: true,
    default: ""
  },

  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String }
  },

  phoneNumber: {
    type: String,
    trim: true,
    default: ""
  },

  gender: {
    type: String,
    enum: ["Male", "Female", "Other", "Prefer not to say"],
    default: "Prefer not to say"
  },

  dateOfBirth: {
    type: Date,
    default: null
  },

  coins: {
    type: Number,
    default: 0
  },

  joinedOn: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });

module.exports = mongoose.model("UserDetail", userDetailSchema);
