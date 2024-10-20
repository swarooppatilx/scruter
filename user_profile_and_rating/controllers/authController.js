const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
  const { username, password, password2 } = req.body;
  let errors = [];

  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (errors.length > 0) {
    res.render('register', { errors });
  } else {
    const user = await User.findOne({ username });
    if (user) {
      errors.push({ msg: 'Username is already taken' });
      res.render('register', { errors });
    } else {
      const newUser = new User({ username, password });
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);
      await newUser.save();
      req.flash('success_msg', 'You are now registered');
      res.redirect('/auth/login');
    }
  }
};

exports.loginUser = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/auth/login',
    failureFlash: true
  })(req, res, next);
};

exports.logoutUser = (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/auth/login');
};
