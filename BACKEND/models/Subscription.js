// backend/models/Subscription.js

const mongoose = require('mongoose');

// Define subscription schema
const subscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true // Ensure uniqueness of emails
  }
});

// Create and export Subscription model
const Subscription = mongoose.model('Subscription', subscriptionSchema);
module.exports = Subscription;
