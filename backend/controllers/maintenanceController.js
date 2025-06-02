const MaintenanceRequest = require('../models/maintenanceRequest');
const ServiceProvider = require('../models/serviceProvider');

const submitRequest = async (req, res) => {
  try {
    const { propertyAddress, issueDescription } = req.body;
    const photos = req.files ? req.files.map(file => ({
      url: file.path,
      description: file.originalname
    })) : [];

    const request = new MaintenanceRequest({
      tenant: req.user.id,
      propertyAddress,
      issueDescription,
      photos,
      status: 'submitted'
    });

    await request.save();
    res.status(201).json({ message: 'Maintenance request submitted', request });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const assignServiceProvider = async (req, res) => {
  try {
    const { requestId, serviceProviderId } = req.body;
    if (!requestId || !serviceProviderId) {
      return res.status(400).json({ message: 'requestId and serviceProviderId are required' });
    }

    const request = await MaintenanceRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Maintenance request not found' });
    }

    request.assignedServiceProvider = serviceProviderId;
    request.status = 'in_progress';
    await request.save();

    res.json({ message: 'Service provider assigned', request });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getRequests = async (req, res) => {
  try {
    const requests = await MaintenanceRequest.find().populate('tenant assignedServiceProvider');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const addServiceProvider = async (req, res) => {
  try {
    const { name, contactPerson, phone, email, servicesProvided } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const serviceProvider = new ServiceProvider({
      name,
      contactPerson,
      phone,
      email,
      servicesProvided
    });

    await serviceProvider.save();
    res.status(201).json({ message: 'Service provider added', serviceProvider });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getServiceProviders = async (req, res) => {
  try {
    const providers = await ServiceProvider.find();
    res.json(providers);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  submitRequest,
  assignServiceProvider,
  getRequests,
  addServiceProvider,
  getServiceProviders
};
