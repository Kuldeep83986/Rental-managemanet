const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tenantApplicationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  personalInfo: {
    fullName: String,
    dateOfBirth: Date,
    phone: String,
    email: String,
  },
  references: [
    {
      name: String,
      relationship: String,
      phone: String,
      email: String,
    }
  ],
  employmentHistory: [
    {
      employer: String,
      position: String,
      startDate: Date,
      endDate: Date,
      income: Number,
    }
  ],
  documents: [
    {
      type: String,
      url: String,
    }
  ],
  backgroundCheckStatus: { type: String, enum: ['pending', 'passed', 'failed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TenantApplication', tenantApplicationSchema);
