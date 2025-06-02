const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const rbacMiddleware = require('../middleware/rbacMiddleware');
const { createLease, renewLease, getLeaseExpiryNotifications } = require('../controllers/leaseController');

// Create a lease (landlord, property_manager only)
router.post(
  '/',
  authMiddleware,
  rbacMiddleware(['landlord', 'property_manager']),
  createLease
);

// Renew a lease (landlord, property_manager only)
router.put(
  '/renew',
  authMiddleware,
  rbacMiddleware(['landlord', 'property_manager']),
  renewLease
);

// Get lease expiry notifications (landlord, property_manager only)
router.get(
  '/expiry-notifications',
  authMiddleware,
  rbacMiddleware(['landlord', 'property_manager']),
  getLeaseExpiryNotifications
);

module.exports = router;
