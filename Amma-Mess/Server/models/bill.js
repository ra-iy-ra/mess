const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  planType: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  date: { type: Date, required: true },
  amount: { type: Number, default: 130 },
  totalAmount: { type: Number, required: true },
  // paymentStatus: { type: String, default: 'Pending' },
  status: { type: String, default: 'Active' },
  paymentDate: { type: Date }
});

module.exports = mongoose.model('Bill', billSchema);