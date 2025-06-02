const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaseSchema = new Schema({
  propertyAddress: { type: String, required: true },
  tenant: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  landlord: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  rentAmount: { type: Number, required: true },
  terms: { type: String },
  status: { type: String, enum: ['active', 'expired', 'terminated'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lease', leaseSchema);
