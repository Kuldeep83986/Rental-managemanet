const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const rbacMiddleware = require('../middleware/rbacMiddleware');
const {
  submitRequest,
  assignServiceProvider,
  getRequests,
  addServiceProvider,
  getServiceProviders
} = require('../controllers/maintenanceController');
const multer = require('multer');
const fs = require('fs');

// Setup multer for photo uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'uploads/maintenance_photos';
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Submit maintenance request (tenant only)
router.post(
  '/',
  authMiddleware,
  rbacMiddleware(['tenant']),
  upload.array('photos', 5),
  submitRequest
);

// Assign service provider to request (landlord, property_manager only)
router.post(
  '/assign',
  authMiddleware,
  rbacMiddleware(['landlord', 'property_manager']),
  assignServiceProvider
);

// Get all maintenance requests (landlord, property_manager only)
router.get(
  '/',
  authMiddleware,
  rbacMiddleware(['landlord', 'property_manager']),
  getRequests
);

// Add service provider (landlord, property_manager only)
router.post(
  '/service-providers',
  authMiddleware,
  rbacMiddleware(['landlord', 'property_manager']),
  addServiceProvider
);

// Get all service providers (landlord, property_manager only)
router.get(
  '/service-providers',
  authMiddleware,
  rbacMiddleware(['landlord', 'property_manager']),
  getServiceProviders
);

module.exports = router;
