// backend/models/LeaveDb.js
const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'inactive'],
    default: 'inactive', // You can set a default value if needed
  },
});

const Leave = mongoose.model('Leave', leaveSchema);

module.exports = Leave;
