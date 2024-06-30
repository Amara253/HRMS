const mongoose = require('mongoose');

const allowanceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
});

const Allowance = mongoose.model('Allowance', allowanceSchema);

module.exports = Allowance;
