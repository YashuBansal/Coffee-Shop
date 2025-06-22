const express = require("express");
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = 3000;

require("dotenv").config();
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use(cors());

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
app.use(express.static(path.join(__dirname, "../frontend")));

// Define Mongoose schema
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});
const Message = mongoose.model("Message", messageSchema);

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
    res.redirect("/admin-dashboard/login.html");
  });
});

// Serve protected HTML
app.get("/admin-dashboard/admin-dashboard.html", (req, res) => {
  if (req.session.loggedIn) {
    res.sendFile(path.join(__dirname, "protected/admin-dashboard.html"));
  } else {
    res.redirect("/admin-dashboard/login.html");
  }
});

// Serve protected CSS
app.get("/admin-dashboard/admin-dashboard.css", (req, res) => {
  if (req.session.loggedIn) {
    res.sendFile(path.join(__dirname, "protected/admin-dashboard.css"));
  } else {
    res.status(403).send("Forbidden");
  }
});

// Serve protected JS
app.get("/admin-dashboard/admin-dashboard.js", (req, res) => {
  if (req.session.loggedIn) {
    res.sendFile(path.join(__dirname, "protected/admin-dashboard.js"));
  } else {
    res.status(403).send("Forbidden");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
