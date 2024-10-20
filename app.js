const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const { body, validationResult } = require("express-validator");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Controllers
const {
  homeRender,
  teamRender,
  loginRender,
  authRender,
  login,
  signup,
  logout,
  contributors,
  foodFormRender,
  houseFormRender,
  marketFormRender,
  displayHouse,
  houseFormSubmit,
  marketDisplay,
  marketFormSubmit,
  displayFoods,
  foodFormSubmit,
} = require("./controller/mainController");

const app = express();

// Import the database.js file
const { User, Food, House, Market } = require('./database'); // Adjust path as needed

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files from 'public' directory
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
{
  folder: "uploads",
  format: async (req, file) => "jpeg", // Supports promises as well
  public_id: (req, file) =>
    Date.now() +
    "-" +
    file.originalname.replace(/[^a-zA-Z0-9_.-]/g, "_").slice(0, 100),
}

// Initialize multer with the Cloudinary storage
const upload = multer({ storage });

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Authentication middleware
const ensureAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.redirect("/auth?action=login");
};

// Routes

// Home route
// Home route
app.get("/", (req, res) => {
  homeRender(req, res, {
    searchAction: "/food",
    selectedType: req.query.type || "food",
    query: req.query.query || "",
    activeLink: "home",
  });
});

// Team route
app.get("/team", (req, res) => {
  teamRender(req, res, {
    searchAction: "/food",
    selectedType: req.query.type || "food",
    q: req.query.q || "",
    activeLink: "",
  });
});


// Render authentication page
app.get("/login", loginRender);

// Render authentication page
app.get("/auth", authRender);

// Handle login form submission
app.post(
const { validationResult } = require("express-validator");

// Handle login form submission
app.post(
  "/login",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("auth", {
        action: "login",
        errors: errors.array(),
        activeLink: "",
      });
    }

    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      console.log("Fetched User from MongoDB: ", user);
      if (user && (await bcrypt.compare(password, user.password))) {
        req.session.user = user;
        res.redirect("/");
      } else {
        res.status(400).render("auth", {
          action: "login",
          errors: [{ msg: "Invalid credentials" }],
          activeLink: "",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).render("500");
    }
  }
);

// Handle signup form submission
app.post(
  "/signup",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Email is required and must be valid"),
    body("password").notEmpty().withMessage("Password is required"),
    body("confirmPassword")
      .notEmpty()
      .withMessage("Confirm Password is required"),
    body("phone").notEmpty().withMessage("Phone number is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("auth", {
        action: "signup",
        errors: errors.array(),
        activeLink: "",
      });
    }

    const { username, email, password, confirmPassword, phone } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).render("auth", {
        action: "signup",
        errors: [{ msg: "Passwords do not match" }],
        activeLink: "",
      });
    }

    try {
      const existingUser = await User.findOne({
        $or: [{ username }, { email }, { phone }],
      });
      if (existingUser) {
        const errors = [];
        if (existingUser.username === username) {
          errors.push({ msg: "Username is already taken" });
        }
        if (existingUser.phone === phone) {
          errors.push({ msg: "Phone is already taken" });
        }
        if (existingUser.email === email) {
          errors.push({ msg: "Email is already registered" });
        }
        return res
          .status(400)
          .render("auth", { action: "signup", errors, activeLink: "" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        phone,
      });
      await newUser.save();

      req.session.user = newUser;
      res.redirect("/");
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).render("auth", {
        action: "signup",
        errors: [{ msg: "Internal Server Error" }],
        activeLink: "",
      });
    }
  }
);

// Handle logout
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error during logout:", err);
      res.status(500).render("500");
    } else {
      res.redirect("/");
    }
  });
});

// Additional features for user account management

// Update personal information (username and email)
app.post("/update-personal-info", ensureAuthenticated, (req, res) => {
  if (!req.session.user || !req.session.user.username) {
    return res.redirect("/login"); // Redirect if not logged in
  }

  const { username } = req.session.user;
  const { newUsername, email } = req.body;

  if (!newUsername || !email) {
    return res.status(400).send("All fields are required.");
  }

  User.findOneAndUpdate(
    { username },
    { username: newUsername, email },
    { new: true }
  )
    .then((updatedUser) => {
      req.session.user = {
        username: updatedUser.username,
        email: updatedUser.email,
        phone: updatedUser.phone,
      };
      res.redirect("/dashboard");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error updating user data.");
    });
});

// Change password
app.post("/change-password", ensureAuthenticated, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { username } = req.session.user;

  if (!currentPassword || !newPassword) {
    return res.status(400).send("All fields are required.");
  }

  User.findOne({ username })
    .then((user) => {
      console.log("User found:", user);
      if (!user) {
        return res.status(404).send("User not found.");
      }

      return bcrypt.compare(currentPassword, user.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(400).send("Current password is incorrect.");
        }

        return bcrypt.hash(newPassword, 10).then((hashedPassword) => {
          user.password = hashedPassword;
          return user.save();
        });
      });
    })
    .then(() => {
      res.redirect("/dashboard");
    })
    .catch((err) => {
      console.error("Error changing password:", err);
      res.status(500).send("Error changing password.");
    });
});

// Update contact info
app.post("/update-contact-info", ensureAuthenticated, (req, res) => {
  const { phone } = req.body;
  const { username } = req.session.user;

  if (!phone) {
    return res.status(400).send("Phone number is required.");
  }

  User.findOneAndUpdate({ username }, { phone }, { new: true })
    .then((updatedUser) => {
      req.session.user = {
        username: updatedUser.username,
        email: updatedUser.email,
        phone: updatedUser.phone,
      };
      res.redirect("/dashboard");
    })
    .catch((err) => {
      console.error("Error updating contact information:", err);
      res.status(500).send("Error updating contact information.");
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
app.get("/contributors", contributors);

// Terms route
app.get('/terms', (req, res) => {
  res.render('terms', {
    activeLink: 'terms', // You can customize this based on your layout
  });
});

app.get('/privacy-policy', (req, res) => {
  res.render('privacy-policy', {
    activeLink: 'privacy-policy', // You can customize this based on your layout
  });
});

// Render form pages with authentication check
app.get("/food/form", ensureAuthenticated, foodFormRender);

app.get("/house/form", ensureAuthenticated, houseFormRender);

app.get("/market/form", ensureAuthenticated, marketFormRender);

// Handle search and display for houses
// Display houses
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
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
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
        email,
        phone,
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

// Display market items
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

// Handle form submission for market items
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
    body('email').isEmail().withMessage('Valid email is required'),
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
        email,
        phone,
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

// Display food items
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

// Handle form submission for food items
app.post(
  '/food',
  upload.single('image'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('latitude').notEmpty().withMessage('Latitude is required'),
    body('longitude').notEmpty().withMessage('Longitude is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
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
        email,
        phone,
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

// Handle deletion of items
app.post('/delete/:type/:id', ensureAuthenticated, async (req, res) => {
  const { type, id } = req.params;
  const { username } = req.session.user;

  try {
    let Model;
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
        return res.status(400).render('500');
    }

    const item = await Model.findOne({ _id: id });
    if (!item) {
      return res.status(404).render('500');
    }

    // Check if the user is "admin" or owns the item
    if (username === 'admin' || item.username === username) {
      await Model.deleteOne({ _id: id });
      return res.redirect(`/${type}`);
    } else {
      return res.status(403).render('403');
    }
  } catch (error) {
    console.error(`Error deleting ${type}:`, error);
    res.status(500).render('500');
  }
});


// 404 Error Handler
app.use((req, res) => {
  res.status(404).render("404");
});

// 500 Error Handler
app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err);
  res.status(500).render("500");
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
