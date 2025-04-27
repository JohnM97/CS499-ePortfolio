const mongoose = require('mongoose');
const User = require('../models/user');
const passport = require('passport');

// =============================================
// POST /api/register
// =============================================
const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: '' // Will be set by setPassword()
    });

    user.setPassword(req.body.password);
    await user.save();

    const token = user.generateJWT();
    return res.status(200).json({ token });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'User registration failed', error });
  }
};

// =============================================
// POST /api/login
// =============================================
const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields required" });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(404).json(err);
    }
    if (user) {
      const token = user.generateJWT();
      return res.status(200).json({ token });
    } else {
      return res.status(401).json(info);
    }
  })(req, res);
};

// =============================================
// Export the controller methods
// =============================================
module.exports = {
  register,
  login
};
