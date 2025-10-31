const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: /@anurag\.edu\.in$/
  },
  password: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: [true, 'Phone number is required'],
    trim: true, // Automatically removes leading/trailing whitespace
    minLength: [1, 'Phone number cannot be empty'] 
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);