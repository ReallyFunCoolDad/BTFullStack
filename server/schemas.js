// models/Blog.js
const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  type: String,
  firstName: String,
  lastName: String,
  issue: String,
  phoneNumber: String,
  email: String,
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Form", formSchema);
