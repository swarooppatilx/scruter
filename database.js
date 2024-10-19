const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

// Define the User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Define the Food schema
const foodSchema = new mongoose.Schema({
  title: String,
  image: String,
  location: String,
  latitude: String,
  longitude: String,
  description: String,
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

// Define the House schema
const houseSchema = new mongoose.Schema({
  title: String,
  image: String,
  location: String,
  rent: Number,
  latitude: String,
  longitude: String,
  description: String,
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

// Define the Market schema
const marketSchema = new mongoose.Schema({
  title: String,
  image: String,
  location: String,
  price: Number,
  latitude: String,
  longitude: String,
  description: String,
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

// Export the models
module.exports = {
  User: mongoose.model('User', userSchema),
  Food: mongoose.model('Food', foodSchema),
  House: mongoose.model('House', houseSchema),
  Market: mongoose.model('Market', marketSchema),
};
