// api.js
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv').config();

const app = express();

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Connect to MongoDB
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// Schemas and Models
const foodSchema = new mongoose.Schema({
  title: String,
  image: String,
  location: String,
  latitude: String,
  longitude: String,
  description: String
});
const Food = mongoose.model('Food', foodSchema);

const houseSchema = new mongoose.Schema({
  title: String,
  image: String,
  location: String,
  rent: Number,
  latitude: String,
  longitude: String,
  description: String
});
const House = mongoose.model('House', houseSchema);

const marketSchema = new mongoose.Schema({
  title: String,
  image: String,
  location: String,
  price: Number,
  latitude: String,
  longitude: String,
  description: String
});
const Market = mongoose.model('Market', marketSchema);

// Create
app.post('/food', upload.single('image'), async (req, res) => {
  try {
    const { title, location, latitude, longitude, description } = req.body;
    const image = req.file ? 'uploads/' + req.file.filename : '';
    const newFood = new Food({ title, image, location, latitude, longitude, description });
    await newFood.save();
    res.status(201).json(newFood);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/house', upload.single('image'), async (req, res) => {
  try {
    const { title, location, rent, latitude, longitude, description } = req.body;
    const image = req.file ? 'uploads/' + req.file.filename : '';
    const newHouse = new House({ title, image, location, rent, latitude, longitude, description });
    await newHouse.save();
    res.status(201).json(newHouse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/market', upload.single('image'), async (req, res) => {
  try {
    const { title, location, price, latitude, longitude, description } = req.body;
    const image = req.file ? 'uploads/' + req.file.filename : '';
    const newMarket = new Market({ title, image, location, price, latitude, longitude, description });
    await newMarket.save();
    res.status(201).json(newMarket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read all
app.get('/food', async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/house', async (req, res) => {
  try {
    const houses = await House.find();
    res.status(200).json(houses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/market', async (req, res) => {
  try {
    const markets = await Market.find();
    res.status(200).json(markets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read one
app.get('/food/:id', async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ error: 'Food not found' });
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/house/:id', async (req, res) => {
  try {
    const house = await House.findById(req.params.id);
    if (!house) return res.status(404).json({ error: 'House not found' });
    res.status(200).json(house);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/market/:id', async (req, res) => {
  try {
    const market = await Market.findById(req.params.id);
    if (!market) return res.status(404).json({ error: 'Market item not found' });
    res.status(200).json(market);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update
app.put('/food/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, location, latitude, longitude, description } = req.body;
    const image = req.file ? 'uploads/' + req.file.filename : undefined;
    const updatedFood = await Food.findByIdAndUpdate(
      req.params.id,
      { title, image, location, latitude, longitude, description },
      { new: true }
    );
    if (!updatedFood) return res.status(404).json({ error: 'Food not found' });
    res.status(200).json(updatedFood);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/house/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, location, rent, latitude, longitude, description } = req.body;
    const image = req.file ? 'uploads/' + req.file.filename : undefined;
    const updatedHouse = await House.findByIdAndUpdate(
      req.params.id,
      { title, image, location, rent, latitude, longitude, description },
      { new: true }
    );
    if (!updatedHouse) return res.status(404).json({ error: 'House not found' });
    res.status(200).json(updatedHouse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/market/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, location, price, latitude, longitude, description } = req.body;
    const image = req.file ? 'uploads/' + req.file.filename : undefined;
    const updatedMarket = await Market.findByIdAndUpdate(
      req.params.id,
      { title, image, location, price, latitude, longitude, description },
      { new: true }
    );
    if (!updatedMarket) return res.status(404).json({ error: 'Market item not found' });
    res.status(200).json(updatedMarket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete
app.delete('/food/:id', async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(req.params.id);
    if (!deletedFood) return res.status(404).json({ error: 'Food not found' });
    res.status(200).json(deletedFood);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/house/:id', async (req, res) => {
  try {
    const deletedHouse = await House.findByIdAndDelete(req.params.id);
    if (!deletedHouse) return res.status(404).json({ error: 'House not found' });
    res.status(200).json(deletedHouse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/market/:id', async (req, res) => {
  try {
    const deletedMarket = await Market.findByIdAndDelete(req.params.id);
    if (!deletedMarket) return res.status(404).json({ error: 'Market item not found' });
    res.status(200).json(deletedMarket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 404 handler
app.use((req, res) => res.status(404).send('Not Found'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
