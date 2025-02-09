const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminSchema = new Schema({
  adminname: {
    type: String,
    required: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100
  },
  
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255
  },
  phone_number: {
    type: String,
    required: true,
    match: /^[7-9][0-9]{9}$/  
  },
  gender: {
    type: String,
    required: true,
    maxlength: 25
  }
});

module.exports = mongoose.model('Admin', AdminSchema);
