const express = require('express');
const router = express.Router();
const Bill = require('../models/bill');
const authenticate = require('../Middleware/authentication'); 

// Generate Bill
router.post('/generate-bill', authenticate, async (req, res) => {
  const { planType } = req.body;
  const userId = req.user.id; 

  if (!planType || !userId) {
    return res.status(400).json({ message: 'Invalid request. PlanType or User ID missing.' });
  }

  try {
    const today = new Date();
    const startDate = today;
    const endDate = new Date(today);
 

    const dailyCost = 130;
    const days = planType === 'Weekly' ? 7 : 30;
    endDate.setDate(today.getDate() + days - 1);

    const bills = [];

    for (let i = 0; i < days; i++) {
      const billDate = new Date(today);
      billDate.setDate(today.getDate() + i);


    const newBill = new Bill({
      user: userId,
      planType,
      startDate,
      endDate,
      date: billDate,
      amount: dailyCost,
      totalAmount: dailyCost,
    });

    bills.push(newBill);
    }


    await Bill.insertMany(bills);
    res.status(201).json(bills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//User Bill History
router.get('/bills', authenticate, async (req, res) => {
  try {
    const bills = await Bill.find({ user: req.user.id }).sort({ startDate: -1 });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Payment Status
router.post('/pay-bill/:billId', authenticate, async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.billId);
    if (!bill) return res.status(404).json({ message: 'Bill not found' });

    bill.paymentStatus = 'Paid';
    bill.paymentDate = new Date();

    await bill.save();
    res.json({ message: 'Payment successful', bill });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Cancel and update the bill status
router.post('/cancel-day/:id', authenticate, async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) return res.status(404).send('Bill not found');
    
    bill.status = 'Cancelled';
    await bill.save();
    
    res.send('Bill cancelled successfully');
  } catch (error) {
    res.status(500).send('Server error');
  }
});


module.exports = router;