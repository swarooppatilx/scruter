const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const multerConfig = require('./config/passport');

const app = express();

// Set EJS as template engine
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Flash messages middleware
app.use(flash());

// Express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// MongoDB connection
mongoose.connect('mongodb://localhost/scruter', { useNewUrlParser: true, useUnifiedTopology: true });

// Importing Routes
const profileRoutes = require('./routes/profile');
const reviewRoutes = require('./routes/reviews');
const authRoutes = require('./routes/auth');

// Routes
app.use('/profile', profileRoutes);
app.use('/reviews', reviewRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
