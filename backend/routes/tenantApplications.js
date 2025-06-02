const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const rbacMiddleware = require('../middleware/rbacMiddleware');
const { submitApplication, getApplications, upload } = require('../controllers/tenantApplicationController');

// Submit tenant application with document uploads
router.post(
  '/',
  authMiddleware,
  rbacMiddleware(['tenant']),
  upload.array('documents', 5),
  submitApplication
);

// Get all tenant applications (landlord, property_manager only)
router.get(
  '/',
  authMiddleware,
  rbacMiddleware(['landlord', 'property_manager']),
  getApplications
);

module.exports = router;
