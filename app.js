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
const app = express();

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files from 'public' directory

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

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

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
      format: async (req, file) => 'jpeg', // Supports promises as well
      public_id: (req, file) => Date.now() + '-' + file.originalname.replace(/[^a-zA-Z0-9_.-]/g, '_').slice(0, 100),
  },
});

// Initialize multer with the Cloudinary storage
const upload = multer({ storage });

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Schemas and Models
const foodSchema = new mongoose.Schema({
  title: String,
  image: String,
  location: String,
  type: String,
  price: Number,
  latitude: String,
  longitude: String,
  description: String,
  username: { type: String, required: true },
});
const Food = mongoose.model("Food", foodSchema);

const houseSchema = new mongoose.Schema({
  title: String,
  image: String,
  location: String,
  type: String,
  rent: Number,
  price: Number,
  latitude: String,
  longitude: String,
  description: String,
  username: { type: String, required: true },
});
const House = mongoose.model("House", houseSchema);

const marketSchema = new mongoose.Schema({
  title: String,
  image: String,
  location: String,
  type: String,
  rent: Number,
  price: Number,
  latitude: String,
  longitude: String,
  description: String,
  username: { type: String, required: true },
});
const Market = mongoose.model("Market", marketSchema);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

// Authentication middleware
const ensureAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.redirect("/auth?action=login");
};

// Routes

// Home route
app.get("/", (req, res) => {
  res.render("index", {
    searchAction: "/food",
    selectedType: req.query.type || "food",
    query: req.query.query || "",
    activeLink: "home",
  });
});

// Team route
app.get("/team", (req, res) => {
  res.render("team", {
    searchAction: "/food",
    selectedType: req.query.type || "food",
    q: req.query.q || "",
    activeLink: "",
  });
});

// Render authentication page
app.get("/login", (req, res) => {
  const action = req.query.action || "login";
  res.render("auth", { action, errors: [], activeLink: "" });
});

// Render authentication page
app.get("/auth", (req, res) => {
  const action = req.query.action || "login";
  res.render("auth", { action, errors: [], activeLink: "" });
});

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
      return res
        .status(400)
        .render("auth", { action: "login", errors: errors.array(), activeLink: "" });
    }

    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (user && (await bcrypt.compare(password, user.password))) {
        req.session.user = user;
        res.redirect("/");
      } else {
        res
          .status(400)
          .render("auth", { action: "login", errors: [{ msg: "Invalid credentials" }], activeLink: "" });
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
    body("confirmPassword").notEmpty().withMessage("Confirm Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("auth", { action: "signup", errors: errors.array(), activeLink: "" });
    }

    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res
        .status(400)
        .render("auth", { action: "signup", errors: [{ msg: "Passwords do not match" }], activeLink: "" });
    }

    try {
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        const errors = [];
        if (existingUser.username === username) {
          errors.push({ msg: "Username is already taken" });
        }
        if (existingUser.email === email) {
          errors.push({ msg: "Email is already registered" });
        }
        return res.status(400).render("auth", { action: "signup", errors, activeLink: "" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
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
      format: async (req, file) => 'jpeg', // Supports promises as well
      public_id: (req, file) => Date.now() + '-' + file.originalname.replace(/[^a-zA-Z0-9_.-]/g, '_').slice(0, 100),
  },
});
      req.session.user = newUser;
      res.redirect("/");
    } catch (error) {
      console.error("Error during signup:", error);
      res
        .status(500)
        .render("auth", { action: "signup", errors: [{ msg: "Internal Server Error" }], activeLink: "" });
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

// Render form pages with authentication check
app.get("/food/form", ensureAuthenticated, (req, res) => {
  res.render("form", { routeName: "food", errors: [], activeLink: "food" });
});

app.get("/house/form", ensureAuthenticated, (req, res) => {
  res.render("form", { routeName: "house", errors: [], activeLink: "house" });
});

app.get("/market/form", ensureAuthenticated, (req, res) => {
  res.render("form", { routeName: "market", errors: [], activeLink: "market" });
});

// Handle search and display for houses
app.get("/house", async (req, res) => {
  const { query = "", page = 1 } = req.query;
  try {
    const cards = await House.find({ title: new RegExp(query, "i") })
      .skip((page - 1) * 10)
      .limit(10);
    const count = await House.countDocuments({ title: new RegExp(query, "i") });
    res.render("display", {
      title: "Houses",
      cards,
      count,
      currentPage: page,
      searchAction: "/house",
      activeLink: "house",
      query,
    });
  } catch (error) {
    console.error("Error fetching houses:", error);
    res.status(500).render("500");
  }
});

// Handle search and display for markets
app.get("/market", async (req, res) => {
  const { query = "", page = 1 } = req.query;
  try {
    const cards = await Market.find({ title: new RegExp(query, "i") })
      .skip((page - 1) * 10)
      .limit(10);
    const count = await Market.countDocuments({ title: new RegExp(query, "i") });
    res.render("display", {
      title: "Markets",
      cards,
      count,
      currentPage: page,
      searchAction: "/market",
      activeLink: "market",
      query,
    });
  } catch (error) {
    console.error("Error fetching markets:", error);
    res.status(500).render("500");
  }
});

// Handle search and display for food
app.get("/food", async (req, res) => {
  const { query = "", page = 1 } = req.query;
  try {
    const cards = await Food.find({ title: new RegExp(query, "i") })
      .skip((page - 1) * 10)
      .limit(10);
    const count = await Food.countDocuments({ title: new RegExp(query, "i") });
    res.render("display", {
      title: "Food",
      cards,
      count,
      currentPage: page,
      searchAction: "/food",
      activeLink: "food",
      query,
    });
  } catch (error) {
    console.error("Error fetching food items:", error);
    res.status(500).render("500");
  }
});

// Handle form submission for food items
app.post(
  "/food",
  ensureAuthenticated,
  upload.single("image"),
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("description").notEmpty().withMessage("Description is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("form", { routeName: "food", errors: errors.array(), activeLink: "food" });
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    const { title, location, type, price, description } = req.body;
    const image = result.secure_url;
    const { username } = req.session.user;
    const { latitude = "", longitude = "" } = req.body;

    try {
      const newFood = new Food({
        title,
        image,
        location,
        type,
        price,
        description,
        username,
        latitude,
        longitude,
      });
      await newFood.save();
      res.redirect("/food");
    } catch (error) {
      console.error("Error saving food item:", error);
      res.status(500).render("500");
    }
  }
);

// Handle form submission for houses
app.post(
  "/house",
  ensureAuthenticated,
  upload.single("image"),
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("rent").isNumeric().withMessage("Rent must be a number"),
    body("description").notEmpty().withMessage("Description is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("form", { routeName: "house", errors: errors.array(), activeLink: "house" });
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    const { title, location, type, price, rent, description } = req.body;
    const image = result.secure_url;
    const { username } = req.session.user;
    const { latitude = "", longitude = "" } = req.body;

    try {
      const newHouse = new House({
        title,
        image,
        location,
        type,
        price,
        rent,
        description,
        username,
        latitude,
        longitude,
      });
      await newHouse.save();
      res.redirect("/house");
    } catch (error) {
      console.error("Error saving house item:", error);
      res.status(500).render("500");
    }
  }
);

// Handle form submission for market items
app.post(
  "/market",
  ensureAuthenticated,
  upload.single("image"),
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("rent").isNumeric().withMessage("Rent must be a number"),
    body("description").notEmpty().withMessage("Description is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("form", { routeName: "market", errors: errors.array(), activeLink: "market" });
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    const { title, location, type, price, rent, description } = req.body;
    const image = result.secure_url;
    const { username } = req.session.user;
    const { latitude = "", longitude = "" } = req.body;

    try {
      const newMarket = new Market({
        title,
        image,
        location,
        type,
        price,
        rent,
        description,
        username,
        latitude,
        longitude,
      });
      await newMarket.save();
      res.redirect("/market");
    } catch (error) {
      console.error("Error saving market item:", error);
      res.status(500).render("500");
    }
  }
);


//Edit Posts

// Display edit form for food
app.get("/food/edit/:id", ensureAuthenticated, async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food || food.username !== req.session.user.username) {
      return res.status(404).render("404"); // or redirect to an appropriate page
    }
    res.render("edit-form", { routeName: "food", item: food, errors: [] , activeLink: "food"});
  } catch (error) {
    console.error("Error fetching food item:", error);
    res.status(500).render("500");
  }
});

// Display edit form for house
app.get("/house/edit/:id", ensureAuthenticated, async (req, res) => {
  try {
    const house = await House.findById(req.params.id);
    if (!house || house.username !== req.session.user.username) {
      return res.status(404).render("404"); // or redirect to an appropriate page
    }
    res.render("edit-form", { routeName: "house", item: house, errors: [], activeLink: "house"});
  } catch (error) {
    console.error("Error fetching house item:", error);
    res.status(500).render("500");
  }
});

// Display edit form for market
app.get("/market/edit/:id", ensureAuthenticated, async (req, res) => {
  try {
    const market = await Market.findById(req.params.id);
    if (!market || market.username !== req.session.user.username) {
      return res.status(404).render("404"); // or redirect to an appropriate page
    }
    res.render("edit-form", { routeName: "market", item: market, errors: [], activeLink: "market"});
  } catch (error) {
    console.error("Error fetching market item:", error);
    res.status(500).render("500");
  }
});

// Handle update form submission for food items
app.post(
  "/food/edit/:id",
  ensureAuthenticated,
  upload.single("image"),
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("description").notEmpty().withMessage("Description is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("edit-form", { routeName: "food", item: req.body, errors: errors.array(), activeLink: "food"});
    }

    try {
      const food = await Food.findById(req.params.id);
      if (!food || food.username !== req.session.user.username) {
        return res.status(404).render("404"); // or redirect to an appropriate page
      }

      // Update fields
      food.title = req.body.title;
      food.location = req.body.location;
      food.price = req.body.price;
      food.description = req.body.description;
      const result = await cloudinary.uploader.upload(req.file.path);
      if (result) {
        food.image = result.secure_url;
      }

      await food.save();
      res.redirect("/food");
    } catch (error) {
      console.error("Error updating food item:", error);
      res.status(500).render("500");
    }
  }
);

// Handle update form submission for house items
app.post(
  "/house/edit/:id",
  ensureAuthenticated,
  upload.single("image"),
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("price").optional().isNumeric().withMessage("Price must be a number"),
    body("rent").optional().isNumeric().withMessage("Rent must be a number"),
    body("description").notEmpty().withMessage("Description is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("edit-form", { routeName: "house", item: req.body, errors: errors.array(), activeLink: "house"});
    }

    try {
      const house = await House.findById(req.params.id);
      if (!house || house.username !== req.session.user.username) {
        return res.status(404).render("404"); // or redirect to an appropriate page
      }

      // Update fields
      house.title = req.body.title;
      house.location = req.body.location;
      house.price = req.body.price;
      house.rent = req.body.rent;
      house.description = req.body.description;
      const result = await cloudinary.uploader.upload(req.file.path);
      if (result) {
        house.image = result.secure_url;
      }

      await house.save();
      res.redirect("/house");
    } catch (error) {
      console.error("Error updating house item:", error);
      res.status(500).render("500");
    }
  }
);

// Handle update form submission for market items
app.post(
  "/market/edit/:id",
  ensureAuthenticated,
  upload.single("image"),
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("description").notEmpty().withMessage("Description is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("edit-form", { routeName: "market", item: req.body, errors: errors.array(), activeLink: "market"});
    }

    try {
      const market = await Market.findById(req.params.id);
      if (!market || market.username !== req.session.user.username) {
        return res.status(404).render("404"); // or redirect to an appropriate page
      }

      // Update fields
      market.title = req.body.title;
      market.location = req.body.location;
      market.price = req.body.price;
      market.description = req.body.description;
      const result = await cloudinary.uploader.upload(req.file.path);
      if (result) {
        market.image = result.secure_url;
      }
      await market.save();
      res.redirect("/market");
    } catch (error) {
      console.error("Error updating market item:", error);
      res.status(500).render("500");
    }
  }
);



//Delete Posts
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
    if (username === "admin" || item.username === username) {

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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).render("500");
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
