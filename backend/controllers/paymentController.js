const Payment = require('../models/payment');

// Stub for payment gateway integration
const processPayment = async (paymentDetails) => {
  // In real implementation, integrate with Stripe, PayPal, etc.
  // Here, we simulate a successful payment with a transaction ID
  return {
    success: true,
    transactionId: 'TXN' + Date.now()
  };
};

const makePayment = async (req, res) => {
  try {
    const { leaseId, amount, paymentMethod } = req.body;
    if (!leaseId || !amount || !paymentMethod) {
      return res.status(400).json({ message: 'leaseId, amount, and paymentMethod are required' });
    }

    const paymentResult = await processPayment({ leaseId, amount, paymentMethod });
    if (!paymentResult.success) {
      return res.status(400).json({ message: 'Payment failed' });
    }

    const payment = new Payment({
      tenant: req.user.id,
      lease: leaseId,
      amount,
      paymentMethod,
      transactionId: paymentResult.transactionId,
      status: 'completed'
    });

    await payment.save();
    res.status(201).json({ message: 'Payment successful', payment });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getTransactionHistory = async (req, res) => {
  try {
    const payments = await Payment.find({ tenant: req.user.id }).populate('lease');
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  makePayment,
  getTransactionHistory
};
