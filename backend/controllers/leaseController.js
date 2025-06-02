const Lease = require('../models/lease');

const createLease = async (req, res) => {
  try {
    const { propertyAddress, tenantId, landlordId, startDate, endDate, rentAmount, terms } = req.body;
    if (!propertyAddress || !tenantId || !landlordId || !startDate || !endDate || !rentAmount) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const lease = new Lease({
      propertyAddress,
      tenant: tenantId,
      landlord: landlordId,
      startDate,
      endDate,
      rentAmount,
      terms,
      status: 'active'
    });

    await lease.save();
    res.status(201).json({ message: 'Lease created successfully', lease });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const renewLease = async (req, res) => {
  try {
    const { leaseId, newEndDate } = req.body;
    if (!leaseId || !newEndDate) {
      return res.status(400).json({ message: 'leaseId and newEndDate are required' });
    }

    const lease = await Lease.findById(leaseId);
    if (!lease) {
      return res.status(404).json({ message: 'Lease not found' });
    }

    lease.endDate = newEndDate;
    lease.status = 'active';
    await lease.save();

    res.json({ message: 'Lease renewed successfully', lease });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getLeaseExpiryNotifications = async (req, res) => {
  try {
    const today = new Date();
    const thresholdDate = new Date();
    thresholdDate.setDate(today.getDate() + 30); // Notify for leases expiring in next 30 days

    const leasesExpiring = await Lease.find({
      endDate: { $gte: today, $lte: thresholdDate },
      status: 'active'
    }).populate('tenant landlord');

    res.json(leasesExpiring);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  createLease,
  renewLease,
  getLeaseExpiryNotifications
};
