const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceProviderSchema = new Schema({
  name: { type: String, required: true },
  contactPerson: { type: String },
  phone: { type: String },
  email: { type: String },
  servicesProvided: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);
