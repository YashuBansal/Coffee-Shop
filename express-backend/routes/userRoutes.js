const express = require("express");
const router = express.Router();
const User = require("../models/User");

// User Register route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "All fields required" });

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "Email already registered" });

  const newUser = new User({ name, email, password });
  await newUser.save();
  res.status(201).json({ user: newUser });
});

// User Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: "User not found" });
  if (user.password !== password)
    return res.status(400).json({ message: "Invalid password" });

  res.json({ user });
});

module.exports = router;