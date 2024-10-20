const Review = require('../models/Review');
const User = require('../models/User');

exports.addReview = async (req, res) => {
  const { rating, reviewText, reviewedUserId } = req.body;
  
  if (!rating || !reviewText || !reviewedUserId) {
    req.flash('error_msg', 'Please fill in all fields');
    return res.redirect('/profile');
  }

  try {
    const review = new Review({
      reviewer: req.user._id,
      reviewedUser: reviewedUserId,
      rating,
      reviewText
    });

    await review.save();

    const reviewedUser = await User.findById(reviewedUserId);
    reviewedUser.reviews.push(review._id);
    await reviewedUser.save();

    req.flash('success_msg', 'Review added successfully');
    res.redirect(`/profile/${reviewedUserId}`);
  } catch (err) {
    req.flash('error_msg', 'Error submitting the review');
    res.redirect('/profile');
  }
};
