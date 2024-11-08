const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    profilePicture: { type: String },
});

// Export the User model
module.exports = mongoose.model('User', UserSchema);
