const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const rbacMiddleware = require('../middleware/rbacMiddleware');
const { makePayment, getTransactionHistory } = require('../controllers/paymentController');

// Make a payment (tenant only)
router.post(
  '/',
  authMiddleware,
  rbacMiddleware(['tenant']),
  makePayment
);

// Get transaction history (tenant only)
router.get(
  '/',
  authMiddleware,
  rbacMiddleware(['tenant']),
  getTransactionHistory
);

module.exports = router;
