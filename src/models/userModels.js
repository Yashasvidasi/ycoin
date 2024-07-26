const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Provide a UserName"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please Provide a Email"],
    unique: true,
  },
  password: { type: String, required: [true, "Please Provide a Password"] },
  user_address: { type: String, required: true },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: String,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
