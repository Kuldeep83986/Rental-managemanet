const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const rbacMiddleware = require('../middleware/rbacMiddleware');
const { getUsers, getUserById } = require('../controllers/userController');

// Get all users (landlord, property_manager only)
router.get(
  '/',
  authMiddleware,
  rbacMiddleware(['landlord', 'property_manager']),
  getUsers
);

// Get user by ID (landlord, property_manager only)
router.get(
  '/:id',
  authMiddleware,
  rbacMiddleware(['landlord', 'property_manager']),
  getUserById
);

module.exports = router;
