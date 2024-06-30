const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema({
  // Employee ID field removed for now
  userID: {
    type: String,
    require: true
  },
  username: {
    type: String,
    require: true
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  leaveType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'approved', 'rejected', 'cancelled'], // Additional options
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const LeaveRequest = mongoose.model('LeaveRequest', leaveRequestSchema);

module.exports = LeaveRequest;
