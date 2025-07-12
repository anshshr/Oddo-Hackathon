const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true,
    trim: true
  },

  category: {
    type: String,
    required: true,
    
  },

  type: {
    type: String,
    required: true,
    
  },

  size: {
    type: String,
    required: true
  },

 


  images: {
    type: [String], // array of image URLs
    required: true
  },

  swapOption: {
    type: String,
    enum: ["swap", "points"],
    required: true
  },

  pointsRequired: {
    type: Number,
    default: 0 // if swapOption is "points"
  },

  status: {
    type: String,
    enum: ["available", "pending", "swapped"],
    default: "available"
  },

  // 👤 Owner Info
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  ownerName: {
    type: String,
    required: true
  },

  ownerImage: {
    type: String,
    default: null // profile pic URL
  },

  // 🔁 Swapped Info (filled after transaction)
  swappedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

  swappedUsername: {
    type: String,
    default: null
  },

  swappedUserPhoto: {
    type: String,
    default: null
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("Product", productSchema);
