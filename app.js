const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const { body, validationResult } = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const MicrosoftStrategy = require('passport-microsoft').Strategy;
const app = express();

// Import the database.js file
const { User, Food, House, Market } = require('./database'); // Adjust path as needed

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from 'public' directory
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Passport serialization
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(err => done(err, null));
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
          });
        }
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ facebookId: profile.id });
        if (!user) {
          user = await User.create({
            facebookId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
          });
        }
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// Microsoft Strategy
passport.use(
  new MicrosoftStrategy(
    {
      clientID: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
      callbackURL: '/auth/microsoft/callback',
      scope: ['user.read'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ microsoftId: profile.id });
        if (!user) {
          user = await User.create({
            microsoftId: profile.id,
            username: profile.displayName,
            email: profile._json.mail,
          });
        }
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// Middleware to set user object for views
app.use((req, res, next) => {
  res.locals.user = req.session.user; // Make user object available in views
  next();
});

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure CloudinaryStorage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    format: async (req, file) => 'jpeg',
    public_id: (req, file) =>
      Date.now() + '-' + file.originalname.replace(/[^a-zA-Z0-9_.-]/g, '_').slice(0, 100),
  },
});

const upload = multer({ storage });

// Authentication middleware
const ensureAuthenticated = (req, res, next) => {
  if (req.session.user || req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth?action=login');
};

// OAuth Routes

// Google OAuth
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

// Facebook OAuth
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

// Microsoft OAuth
app.get('/auth/microsoft', passport.authenticate('microsoft'));
app.get('/auth/microsoft/callback', passport.authenticate('microsoft', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

// Routes (existing routes, like '/', '/team', etc., remain the same)

// Home route
app.get('/', (req, res) => {
  res.render('index', {
    searchAction: '/food',
    selectedType: req.query.type || 'food',
    query: req.query.query || '',
    activeLink: 'home',
  });
});

//Change in Dashboard Stuff

//Updating Personal Information of Username and Email
app.post('/update-personal-info', ensureAuthenticated, (req, res) => {
  if (!req.session.user || !req.session.user.username) {
    return res.redirect('/login'); // Redirect if not logged in
  }

  const { username } = req.session.user;
  const { newUsername, email } = req.body;

  if (!newUsername || !email) {
    return res.status(400).send('All fields are required.');
  }

  User.findOneAndUpdate(
    { username },
    { username: newUsername, email },
    { new: true }
  )
    .then(updatedUser => {
      // Update session data after successful update
      req.session.user = {
        username: updatedUser.username,
        email: updatedUser.email,
        phone: updatedUser.phone,
      };
      res.redirect('/dashboard');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error updating user data.');
    });
});

//Changing The Password
app.post('/change-password', ensureAuthenticated, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { username } = req.session.user; // Fetch the username from the session

  // Validate inputs
  if (!currentPassword || !newPassword) {
    return res.status(400).send('All fields are required.');
  }

  // Find the user by username instead of userId
  User.findOne({ username })
    .then(user => {
      console.log('User found:', user); // Log the user object for debugging
      if (!user) {
        return res.status(404).send('User not found.');
      }

      // Check if the current password matches (using bcrypt)
      return bcrypt.compare(currentPassword, user.password).then(isMatch => {
        if (!isMatch) {
          return res.status(400).send('Current password is incorrect.');
        }

        // Hash the new password and save it
        return bcrypt.hash(newPassword, 10).then(hashedPassword => {
          user.password = hashedPassword; // Update the password
          return user.save(); // Save the updated user data
        });
      });
    })
    .then(() => {
      res.redirect('/dashboard'); // Redirect to the dashboard after success
    })
    .catch(err => {
      console.error('Error changing password:', err);
      res.status(500).send('Error changing password.'); //Show Error when unsuccessful
    });
});

//Updating Contact Info
app.post('/update-contact-info', ensureAuthenticated, (req, res) => {
  const { phone } = req.body;
  const { username } = req.session.user; // Fetch the username from the session

  // Validate input data
  if (!phone) {
    return res.status(400).send('Phone number is required.');
  }

  // Update the user phone number in the database based on the username
  User.findOneAndUpdate({ username }, { phone }, { new: true })
    .then(updatedUser => {
      // Update the session with the new contact information
      req.session.user = {
        username: updatedUser.username,
        email: updatedUser.email,
        phone: updatedUser.phone,
      };
      res.redirect('/dashboard'); // Redirect back to the dashboard
    })
    .catch(err => {
      console.error('Error updating contact information:', err);
      res.status(500).send('Error updating contact information.');
    });
});

// Handle logout
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error during logout:', err);
      res.status(500).render('500');
    } else {
      res.redirect('/');
    }
  });
});

// Express Route to render the User Dashboard page
app.get('/dashboard', ensureAuthenticated, (req, res) => {
  const user = req.session.user; // Accessing user from session
  res.render('dashboard', { user, activeLink: 'userdashboard' });
});

//About Page Route
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Us - Scruter',
    appName: 'Scruter',
    activeLink: 'about',
  });
});

// Contributors Route
app.get('/contributors', (req, res) => {
  res.render('contributors', { activeLink: 'contributors' });
});

// Terms route
app.get('/terms', (req, res) => {
  res.render('terms', {
    activeLink: 'terms', // You can customize this based on your layout
  });
});

app.get('/terms-page', (req, res) => {
  res.render('terms-page', {
    activeLink: 'terms-page', // You can customize this based on your layout
  });
});

app.get('/faq', (req, res) => {
  res.render('faq', {
    activeLink: 'faq', // You can customize this based on your layout
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    activeLink: 'help', // You can customize this based on your layout
  });
});

app.get('/support', (req, res) => {
  res.render('support', {
    activeLink: 'support', // You can customize this based on your layout
  });
});

app.get('/privacy-policy', (req, res) => {
  res.render('privacy-policy', {
    activeLink: 'privacy-policy', // You can customize this based on your layout
  });
});

// Render form pages with authentication check
app.get('/food/form', ensureAuthenticated, (req, res) => {
  res.render('form', { routeName: 'food', errors: [], activeLink: 'food' });
});

app.get('/house/form', ensureAuthenticated, (req, res) => {
  res.render('form', { routeName: 'house', errors: [], activeLink: 'house' });
});

app.get('/market/form', ensureAuthenticated, (req, res) => {
  res.render('form', { routeName: 'market', errors: [], activeLink: 'market' });
});

app.get('/:type/edit/:id', ensureAuthenticated, async (req, res) => {
  const { id, type } = req.params
  if (!['food', 'house', 'market'].includes(type)) return res.status(400).render('400');

  const Model = type === 'food' ? Food : type === 'house' ? House : Market
  const item = await Model.findById(id).catch(() => { });
  if (!item) return res.status(404).render('404');

  if (req.session.user.username !== item.username)
    return res.status(500).render('500');

  res.render("edit", { item, type, activeLink: type });
})

// Handle search and display for houses
app.get('/house', async (req, res) => {
  try {
    const domain = req.get('host');
    const query = req.query.query || '';
    const searchRegex = new RegExp(query, 'i');

    const houses = await House.find({
      $or: [
        { title: searchRegex },
        { location: searchRegex },
        { description: searchRegex },
      ],
    });

    res.render('display', {
      cards: houses,
      domain,
      imagepath: '/house.jpg',
      query,
      selectedType: 'house',
      searchAction: '/house',
      activeLink: 'house',
    });
  } catch (error) {
    console.error('Error fetching houses:', error);
    res.status(500).render('500');
  }
});

// Handle form submission for houses
app.post(
  '/house',
  upload.single('image'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('rent').isNumeric().withMessage('Rent must be a number'),
    body('latitude').notEmpty().withMessage('Latitude is required'),
    body('longitude').notEmpty().withMessage('Longitude is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('email').isEmail().withMessage('Email is required and must be valid'), //email
    body('phone').notEmpty().withMessage('Phone number is required'), //phone
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('form', {
        routeName: 'house',
        errors: errors.array(),
        activeLink: 'house',
      });
    }

    try {
      const {
        title,
        location,
        rent,
        latitude,
        longitude,
        description,
        email,
        phone,
      } = req.body;
      const username = req.session.user.username;
      const result = await cloudinary.uploader.upload(req.file.path);
      const house = new House({
        title,
        location,
        rent,
        latitude,
        longitude,
        description,
        image: result.secure_url,
        username,
        email, //email
        phone, //phone
      });

      await house.save();
      res.redirect('/house');
    } catch (error) {
      console.error('Error saving house:', error);
      res.status(500).render('form', {
        routeName: 'house',
        errors: [{ msg: 'Internal Server Error' }],
        activeLink: 'house',
      });
    }
  }
);

app.post(
  '/edit/:type/:id',
  upload.single('image'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('latitude').notEmpty().withMessage('Latitude is required'),
    body('longitude').notEmpty().withMessage('Longitude is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('email').isEmail().withMessage('Email is required and must be valid'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('rent').custom((value, { req }) => req.params.type === 'house' ? value !== '' && !isNaN(value) : true),
    body('price').custom((value, { req }) => req.params.type === 'market' ? value !== '' && !isNaN(value) : true),
  ],
  async (req, res) => {
    const { type, id } = req.params;
    if (!['food', 'house', 'market'].includes(type)) return res.status(400).render('400');

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).render(`/edit/${type}/${id}`, {
      type: req.params.type,
      errors: errors.array(),
      activeLink: req.params.activeLink,
    });    

    const Model = type === 'food' ? Food : type === 'house' ? House : Market
    const item = await Model.findById(id).catch(() => { });
    if (!item) return res.status(404).render('404');

    if (req.session.user.username !== item.username)
      return res.status(500).render('500');

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      item.image = result.secure_url;
    }

    Object.assign(item, req.body);
    await item.save();

    return res.redirect(`/${type}`);
  })

// Handle search and display for market
app.get('/market', async (req, res) => {
  try {
    const domain = req.get('host');
    const query = req.query.query || '';
    const searchRegex = new RegExp(query, 'i');

    const markets = await Market.find({
      $or: [
        { title: searchRegex },
        { location: searchRegex },
        { description: searchRegex },
      ],
    });

    res.render('display', {
      cards: markets,
      domain,
      imagepath: '/market.jpg',
      query,
      selectedType: 'market',
      searchAction: '/market',
      activeLink: 'market',
    });
  } catch (error) {
    console.error('Error fetching markets:', error);
    res.status(500).render('500');
  }
});

// Handle form submission for market
app.post(
  '/market',
  upload.single('image'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('latitude').notEmpty().withMessage('Latitude is required'),
    body('longitude').notEmpty().withMessage('Longitude is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('email').isEmail().withMessage('Email is required and must be valid'),
    body('phone').notEmpty().withMessage('Phone number is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('form', {
        routeName: 'market',
        errors: errors.array(),
        activeLink: 'market',
      });
    }

    try {
      const {
        title,
        location,
        price,
        latitude,
        longitude,
        description,
        email,
        phone,
      } = req.body;
      const username = req.session.user.username;
      const result = await cloudinary.uploader.upload(req.file.path);
      const market = new Market({
        title,
        location,
        price,
        latitude,
        longitude,
        description,
        image: result.secure_url,
        username,
        email, //email
        phone, //phone
      });

      await market.save();
      res.redirect('/market');
    } catch (error) {
      console.error('Error saving market item:', error);
      res.status(500).render('form', {
        routeName: 'market',
        errors: [{ msg: 'Internal Server Error' }],
        activeLink: 'market',
      });
    }
  }
);

// Handle search and display for food
app.get('/food', async (req, res) => {
  try {
    const domain = req.get('host');
    const query = req.query.query || '';
    const searchRegex = new RegExp(query, 'i');

    const foods = await Food.find({
      $or: [
        { title: searchRegex },
        { location: searchRegex },
        { description: searchRegex },
      ],
    });

    res.render('display', {
      cards: foods,
      domain,
      imagepath: '/food.jpg',
      query,
      selectedType: 'food',
      searchAction: '/food',
      activeLink: 'food',
    });
  } catch (error) {
    console.error('Error fetching foods:', error);
    res.status(500).render('500');
  }
});

// Handle form submission for food
app.post(
  '/food',
  upload.single('image'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('latitude').notEmpty().withMessage('Latitude is required'),
    body('longitude').notEmpty().withMessage('Longitude is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('email').isEmail().withMessage('Email is required and must be valid'), //email
    body('phone').notEmpty().withMessage('Phone number is required'), //phone
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('form', {
        routeName: 'food',
        errors: errors.array(),
        activeLink: 'food',
      });
    }

    try {
      const {
        title,
        location,
        latitude,
        longitude,
        description,
        email,
        phone,
      } = req.body;
      const username = req.session.user.username;
      const result = await cloudinary.uploader.upload(req.file.path);
      const food = new Food({
        title,
        location,
        latitude,
        longitude,
        description,
        image: result.secure_url,
        username,
        email, //email
        phone, //phone
      });

      await food.save();
      res.redirect('/food');
    } catch (error) {
      console.error('Error saving food item:', error);
      res.status(500).render('form', {
        routeName: 'food',
        errors: [{ msg: 'Internal Server Error' }],
        activeLink: 'food',
      });
    }
  }
);

app.post('/delete/:type/:id', ensureAuthenticated, async (req, res) => {
  const { type, id } = req.params;
  const { username } = req.session.user;

  try {
    let Model;
    let item;

    switch (type) {
      case 'food':
        Model = Food;
        break;
      case 'house':
        Model = House;
        break;
      case 'market':
        Model = Market;
        break;
      default:
        res.status(500).render('500');
    }

    // Find the item to delete
    item = await Model.findOne({ _id: id });
    if (!item) {
      res.status(500).render('500');
    }

    // Check if the user is "admin" or owns the item
    if (username === 'admin' || item.username === username) {
      // Delete the item from the database
      await Model.deleteOne({ _id: id });
      return res.redirect(`/${type}`);
    } else {
      res.status(500).render('500');
    }
  } catch (error) {
    console.error(`Error deleting ${type}:`, error);
    res.status(500).render('500');
  }
});


// 404 Error Handler
app.use((req, res) => {
  res.status(404).render('404');
});

// 500 Error Handler
app.use((err, req, res, next) => {
  console.error('Internal Server Error:', err);
  res.status(500).render('500');
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
