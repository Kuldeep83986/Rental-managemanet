const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  tenant: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  lease: { type: Schema.Types.ObjectId, ref: 'Lease', required: true },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  paymentMethod: { type: String, enum: ['credit_card', 'debit_card', 'bank_transfer', 'paypal', 'stripe'], required: true },
  transactionId: { type: String },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  receiptUrl: { type: String }
});

module.exports = mongoose.model('Payment', paymentSchema);
