// usermodels.js
const mongoose = require('mongoose'); // only once

// User schema and model
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true, match: /^[A-Za-z]+$/ },
  lastName: { type: String, required: true, trim: true, match: /^[A-Za-z]+$/ },
  email: { type: String, required: true, unique: true, lowercase: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  password: { type: String, required: true },
});

// Export the model
module.exports = mongoose.model('User', userSchema);
