// backend/models/EmployeeDb.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: String,
    required: true,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  
  address: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  profilepic: {
    type: String,
    require: false,
  },
  profilecv: {
    type: String,
    require: false,
  },
  
  // joiningDate: {
  //   type: String,
  //   required: true,
  // },
  // leaving: {
  //   type: String,
  // },


  
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
