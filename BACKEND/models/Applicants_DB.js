const mongoose = require('mongoose');
//schema
const applicantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true ,unique: true},  
  password:{ type: String, required: true },
  profilepic: {
    type: String,
    require: false,
  },
  profilecv: {
    type: String,
    require: false,
  },
});

const Applicant = mongoose.model('Applicant', applicantSchema);

module.exports = Applicant;
