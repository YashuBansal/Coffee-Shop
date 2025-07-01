const express = require("express");
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = 5000;

require("dotenv").config();
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use(
  cors({
    origin: "http://localhost:3000", // Allow React dev server
    credentials: true,              // Send cookies
  })
);

app.use(
  session({
    secret: "secret123", // use process.env.SECRET in production
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true },
    cookie: { maxAge: 48 * 60 * 60 * 1000 }, // 2 days
  })
);

app.use(express.json());

// Mongoose Message schema
const Message = require("./models/Message");

// API Route
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  const newMessage = new Message({ name, email, message });
  await newMessage.save();

  res.json({ success: true, message: "Message received successfully!" });
});

app.get("/messages", async (req, res) => {
  if (!req.session.loggedIn) return res.status(403).send("Forbidden");
  try {
    const messages = await Message.find().sort({ createdAt: -1 }); // recent first
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

app.delete("/messages/:id", async (req, res) => {
  if (!req.session.loggedIn) return res.status(403).send("Forbidden");
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: "Deletion failed" });
  }
});

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

// Login logic
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "password123") {
    req.session.loggedIn = true;
    return res.status(200).send("Login success");
  } else {
    return res.status(401).send("Invalid login");
  }
});

// Logout route
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/admin-login");
  });
});

app.get("/check-auth", (req, res) => {
  if (req.session.loggedIn) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

//All done for admin dashboard

//User Register route
const User = require("./models/User");

app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "All fields required" });

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "Email already registered" });

  const newUser = new User({ name, email, password });
  await newUser.save();
  res.status(201).json({ user: newUser });
});

// User Login route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  if (user.password !== password)
    return res.status(400).json({ message: "Invalid password" });

  res.json({ user });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
