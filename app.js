const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const { body } = require("express-validator");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
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
    folder: "uploads",
    format: async (req, file) => "jpeg", // Supports promises as well
    public_id: (req, file) =>
      Date.now() +
      "-" +
      file.originalname.replace(/[^a-zA-Z0-9_.-]/g, "_").slice(0, 100),
  },
});

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
app.get("/", homeRender);

// Team route
app.get("/team", teamRender);

// Render authentication page
app.get("/login", loginRender);

// Render authentication page
app.get("/auth", authRender);

// Handle login form submission
app.post(
  "/login",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
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
  signup
);

// Handle logout
app.get("/logout", logout);

// Contributors Route
app.get("/contributors", contributors);

// Render form pages with authentication check
app.get("/food/form", ensureAuthenticated, foodFormRender);

app.get("/house/form", ensureAuthenticated, houseFormRender);

app.get("/market/form", ensureAuthenticated, marketFormRender);

// Handle search and display for houses
app.get("/house", displayHouse);

// Handle form submission for houses
app.post(
  "/house",
  upload.single("image"),
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("rent").isNumeric().withMessage("Rent must be a number"),
    body("latitude").notEmpty().withMessage("Latitude is required"),
    body("longitude").notEmpty().withMessage("Longitude is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("email").isEmail().withMessage("Email is required and must be valid"), //email
    body("phone").notEmpty().withMessage("Phone number is required"), //phone
  ],
  houseFormSubmit
);

// Handle search and display for market
app.get("/market", marketDisplay);

// Handle form submission for market
app.post(
  "/market",
  upload.single("image"),
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("latitude").notEmpty().withMessage("Latitude is required"),
    body("longitude").notEmpty().withMessage("Longitude is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("email").isEmail().withMessage("Email is required and must be valid"),
    body("phone").notEmpty().withMessage("Phone number is required"),
  ],
  marketFormSubmit
);

// Handle search and display for food
app.get("/food", displayFoods);

// Handle form submission for food
app.post(
  "/food",
  upload.single("image"),
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("latitude").notEmpty().withMessage("Latitude is required"),
    body("longitude").notEmpty().withMessage("Longitude is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("email").isEmail().withMessage("Email is required and must be valid"), //email
    body("phone").notEmpty().withMessage("Phone number is required"), //phone
  ],
  foodFormSubmit
);

app.post("/delete/:type/:id", ensureAuthenticated, deleteItem);

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
