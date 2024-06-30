const mongoose = require('mongoose');

const DeductionSchema = new mongoose.Schema({
  designation: {
    type: String,
    required: true
  },
  tax: {
    type: Number,
    required: true
  }
});

const Deduction = mongoose.model('Deduction', DeductionSchema);

module.exports = Deduction;