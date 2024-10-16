const User = require("../models/User");
const House = require("../models/House");
const Market = require("../models/Market");
const Food = require("../models/Food");
const { validationResult } = require("express-validator");

//Render the index page
const homeRender = (req, res) => {
  res.render("index", {
    searchAction: "/food",
    selectedType: req.query.type || "food",
    query: req.query.query || "",
    activeLink: "home",
  });
};

//Render the food page
const teamRender = (req, res) => {
  res.render("team", {
    searchAction: "/food",
    selectedType: req.query.type || "food",
    q: req.query.q || "",
    activeLink: "",
  });
};

//Render the authentication page
const loginRender = (req, res) => {
  const action = req.query.action || "login";
  res.render("auth", { action, errors: [], activeLink: "" });
};

const authRender = (req, res) => {
  const action = req.query.action || "login";
  res.render("auth", { action, errors: [], activeLink: "" });
};

//Handle Login
const login = async (req, res) => {
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
};

//handle signup

const signup = async (req, res) => {
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
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      const errors = [];
      if (existingUser.username === username) {
        errors.push({ msg: "Username is already taken" });
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
};

//handle logout
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error during logout:", err);
      res.status(500).render("500");
    } else {
      res.redirect("/");
    }
  });
};

//handle contributors page

const contributors = (req, res) => {
  res.render("contributors", { activeLink: "contributors" });
};

//handle food form render

const foodFormRender = (req, res) => {
  res.render("form", { routeName: "food", errors: [], activeLink: "food" });
};

//handle house form render
const houseFormRender = (req, res) => {
  res.render("form", { routeName: "house", errors: [], activeLink: "house" });
};

//handle market form render
const marketFormRender = (req, res) => {
  res.render("form", { routeName: "market", errors: [], activeLink: "market" });
};

//handle displaying houses
const displayHouse = async (req, res) => {
  try {
    const domain = req.get("host");
    const query = req.query.query || "";
    const searchRegex = new RegExp(query, "i");

    const houses = await House.find({
      $or: [
        { title: searchRegex },
        { location: searchRegex },
        { description: searchRegex },
      ],
    });

    res.render("display", {
      cards: houses,
      domain,
      imagepath: "/house.jpg",
      query,
      selectedType: "house",
      searchAction: "/house",
      activeLink: "house",
    });
  } catch (error) {
    console.error("Error fetching houses:", error);
    res.status(500).render("500");
  }
};

//handle form submission for house
const houseFormSubmit = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("form", {
      routeName: "house",
      errors: errors.array(),
      activeLink: "house",
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
    res.redirect("/house");
  } catch (error) {
    console.error("Error saving house:", error);
    res.status(500).render("form", {
      routeName: "house",
      errors: [{ msg: "Internal Server Error" }],
      activeLink: "house",
    });
  }
};

//handle display of market
const marketDisplay = async (req, res) => {
  try {
    const domain = req.get("host");
    const query = req.query.query || "";
    const searchRegex = new RegExp(query, "i");

    const markets = await Market.find({
      $or: [
        { title: searchRegex },
        { location: searchRegex },
        { description: searchRegex },
      ],
    });

    res.render("display", {
      cards: markets,
      domain,
      imagepath: "/market.jpg",
      query,
      selectedType: "market",
      searchAction: "/market",
      activeLink: "market",
    });
  } catch (error) {
    console.error("Error fetching markets:", error);
    res.status(500).render("500");
  }
};

const marketFormSubmit = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("form", {
      routeName: "market",
      errors: errors.array(),
      activeLink: "market",
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
    res.redirect("/market");
  } catch (error) {
    console.error("Error saving market item:", error);
    res.status(500).render("form", {
      routeName: "market",
      errors: [{ msg: "Internal Server Error" }],
      activeLink: "market",
    });
  }
};

const displayFoods = async (req, res) => {
  try {
    const domain = req.get("host");
    const query = req.query.query || "";
    const searchRegex = new RegExp(query, "i");

    const foods = await Food.find({
      $or: [
        { title: searchRegex },
        { location: searchRegex },
        { description: searchRegex },
      ],
    });

    res.render("display", {
      cards: foods,
      domain,
      imagepath: "/food.jpg",
      query,
      selectedType: "food",
      searchAction: "/food",
      activeLink: "food",
    });
  } catch (error) {
    console.error("Error fetching foods:", error);
    res.status(500).render("500");
  }
};

const foodFormSubmit = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("form", {
      routeName: "food",
      errors: errors.array(),
      activeLink: "food",
    });
  }

  try {
    const { title, location, latitude, longitude, description, email, phone } =
      req.body;
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
    res.redirect("/food");
  } catch (error) {
    console.error("Error saving food item:", error);
    res.status(500).render("form", {
      routeName: "food",
      errors: [{ msg: "Internal Server Error" }],
      activeLink: "food",
    });
  }
};

//delete something
const deleteItem = async (req, res) => {
  const { type, id } = req.params;
  const { username } = req.session.user;

  try {
    let Model;
    let item;

    switch (type) {
      case "food":
        Model = Food;
        break;
      case "house":
        Model = House;
        break;
      case "market":
        Model = Market;
        break;
      default:
        res.status(500).render("500");
    }

    // Find the item to delete
    item = await Model.findOne({ _id: id });
    if (!item) {
      res.status(500).render("500");
    }

    // Check if the user is "admin" or owns the item
    if (username === "admin" || item.username === username) {
      // Delete the item from the database
      await Model.deleteOne({ _id: id });
      return res.redirect(`/${type}`);
    } else {
      res.status(500).render("500");
    }
  } catch (error) {
    console.error(`Error deleting ${type}:`, error);
    res.status(500).render("500");
  }
};

module.exports = {
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
  deleteItem,
};
