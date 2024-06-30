const mongoose = require('mongoose');
//schema
const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
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

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
