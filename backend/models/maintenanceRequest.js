const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const maintenanceRequestSchema = new Schema({
  tenant: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  propertyAddress: { type: String, required: true },
  issueDescription: { type: String, required: true },
  photos: [
    {
      url: String,
      description: String
    }
  ],
  status: { type: String, enum: ['submitted', 'in_progress', 'completed', 'cancelled'], default: 'submitted' },
  assignedServiceProvider: { type: Schema.Types.ObjectId, ref: 'ServiceProvider' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MaintenanceRequest', maintenanceRequestSchema);
