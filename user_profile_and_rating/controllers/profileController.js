const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('ads').populate('reviews');
    res.render('profile', { user });
  } catch (err) {
    req.flash('error_msg', 'Error fetching profile');
    res.redirect('/');
  }
};

exports.updateProfile = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    req.flash('error_msg', 'Please provide a username');
    return res.redirect('/profile');
  }

  try {
    await User.findByIdAndUpdate(req.user._id, { username });
    req.flash('success_msg', 'Profile updated successfully');
    res.redirect('/profile');
  } catch (err) {
    req.flash('error_msg', 'Error updating profile');
    res.redirect('/profile');
  }
};
