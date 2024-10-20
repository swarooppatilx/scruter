const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: String,
  ads: [{ title: String, description: String, datePosted: Date }],
  savedItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ad' }],
  transactionHistory: [{ type: String }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

module.exports = mongoose.model('User', userSchema);
