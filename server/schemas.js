const mongoose = require("mongoose");

// Ticket Schema (Form)
const formSchema = new mongoose.Schema({
  status: { type: String, default: "pending" },
  type: String,
  companyName: String,
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

const Form = mongoose.model("Form", formSchema);

// Customer Schema
const customerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  companyName: String,
  email: { type: String, unique: true, sparse: true },
  phoneNumber: { type: String, unique: true, sparse: true },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Form" }],
});

const Customers = mongoose.model("Customer", customerSchema);

module.exports = {
  Form,
  Customers,
};
