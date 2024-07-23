const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const dotenv = require('dotenv').config();
const { body, validationResult } = require('express-validator');
const axios = require('axios'); // Import Axios
const FormData = require('form-data');

const app = express();

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

const apiUrl = process.env.API_URL || 'http://localhost:3000'; // API base URL

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

// Routes for the frontend
app.get('/food/form', (req, res) => {
  res.render('form', { routeName: 'food' });
});

app.get('/house/form', (req, res) => {
  res.render('form', { routeName: 'house' });
});

app.get('/market/form', (req, res) => {
  res.render('form', { routeName: 'market' });
});

app.get('/house', async (req, res) => {
  try {
    const domain = req.get('host');
    const response = await axios.get(`${apiUrl}/house`);
    const cards = response.data;
    res.render('display', { cards, domain, imagepath: "/house.jpg" });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/house', upload.single('image'), async (req, res) => {
  try {
    const formData = new FormData();
    formData.append('title', req.body.title);
    formData.append('location', req.body.location);
    formData.append('rent', req.body.rent);
    formData.append('latitude', req.body.latitude);
    formData.append('longitude', req.body.longitude);
    formData.append('description', req.body.description);
    if (req.file) {
      formData.append('image', req.file.buffer, req.file.originalname);
    }

    await axios.post(`${apiUrl}/house`, formData, { headers: formData.getHeaders() });
    res.redirect('/house');
  } catch (error) {
    console.error('Error saving House:', error);
  }
});

app.get('/market', async (req, res) => {
  try {
    const domain = req.get('host');
    const response = await axios.get(`${apiUrl}/market`);
    const cards = response.data;
    res.render('display', { cards, domain, imagepath: "/market.jpg" });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/market', upload.single('image'), async (req, res) => {
  try {
    const formData = new FormData();
    formData.append('title', req.body.title);
    formData.append('location', req.body.location);
    formData.append('price', req.body.price);
    formData.append('latitude', req.body.latitude);
    formData.append('longitude', req.body.longitude);
    formData.append('description', req.body.description);
    if (req.file) {
      formData.append('image', req.file.buffer, req.file.originalname);
    }

    await axios.post(`${apiUrl}/market`, formData, { headers: formData.getHeaders() });
    res.redirect('/market');
  } catch (error) {
    console.error('Error saving Market:', error);
  }
});

app.get('/food', async (req, res) => {
  try {
    const domain = req.get('host');
    const response = await axios.get(`${apiUrl}/food`);
    const cards = response.data;
    res.render('display', { cards, domain, imagepath: "/food.jpg" });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/food', upload.single('image'), async (req, res) => {
  try {
    const formData = new FormData();
    formData.append('title', req.body.title);
    formData.append('location', req.body.location);
    formData.append('latitude', req.body.latitude);
    formData.append('longitude', req.body.longitude);
    formData.append('description', req.body.description);
    if (req.file) {
      formData.append('image', req.file.buffer, req.file.originalname);
    }

    await axios.post(`${apiUrl}/food`, formData, { headers: formData.getHeaders() });
    res.redirect('/food');
  } catch (error) {
    console.error('Error saving Food:', error);
  }
});

// API routes
app.post('/api/food', upload.single('image'), [
  body('title').notEmpty().withMessage('Title is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('latitude').isFloat().withMessage('Latitude must be a valid number'),
  body('longitude').isFloat().withMessage('Longitude must be a valid number'),
  body('description').notEmpty().withMessage('Description is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
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

app.post('/api/house', upload.single('image'), [
  body('title').notEmpty().withMessage('Title is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('rent').isFloat().withMessage('Rent must be a valid number'),
  body('latitude').isFloat().withMessage('Latitude must be a valid number'),
  body('longitude').isFloat().withMessage('Longitude must be a valid number'),
  body('description').notEmpty().withMessage('Description is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
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

app.post('/api/market', upload.single('image'), [
  body('title').notEmpty().withMessage('Title is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('price').isFloat().withMessage('Price must be a valid number'),
  body('latitude').isFloat().withMessage('Latitude must be a valid number'),
  body('longitude').isFloat().withMessage('Longitude must be a valid number'),
  body('description').notEmpty().withMessage('Description is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
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

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
