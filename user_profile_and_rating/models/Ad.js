const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  datePosted: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ad', adSchema);
