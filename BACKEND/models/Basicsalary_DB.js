const mongoose = require('mongoose');

const basicsalarySchema = new mongoose.Schema({
  designation: { type: String, required: true },
  salary: { type: Number, required: true },
});

const Basicsalary = mongoose.model('BasicSalary', basicsalarySchema);

module.exports = Basicsalary;
