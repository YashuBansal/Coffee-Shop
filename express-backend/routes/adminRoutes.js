const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

//Admin Login route
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "password123") {
    req.session.loggedIn = true;
    console.log("Logged in, session:", req.session);
    return res.status(200).send("Login success");
  } else {
    return res.status(401).send("Invalid login");
  }
});

// Check if user is logged in
router.get("/check-auth", (req, res) => {
    if (req.session.loggedIn) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

// Logout route
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/admin-login");
    });
});

// Submit message route
router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;
  const newMessage = new Message({ name, email, message });
  await newMessage.save();
  res.json({ success: true, message: "Message received successfully!" });
});

// Fetch all messages route
router.get("/messages", async (req, res) => {
  console.log("Check session:", req.session);
    if (!req.session.loggedIn) return res.status(403).send("Forbidden");
    try {
        const messages = await Message.find().sort({ createdAt: -1 }); // recent first
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch messages" });
    }
});

// Delete message route
router.delete("/messages/:id", async (req, res) => {
    if (!req.session.loggedIn) return res.status(403).send("Forbidden");
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Message deleted" });
    } catch (err) {
        res.status(500).json({ success: false, error: "Deletion failed" });
    }
});

module.exports = router;