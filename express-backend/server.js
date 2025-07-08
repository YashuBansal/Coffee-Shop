const express = require("express");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.set("trust proxy", 1);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Middleware
app.use(cors({
  origin: ["http://localhost:3000", "https://coffee-shop-tau-five.vercel.app"],
  credentials: true
}));
  
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret123", // use process.env.SECRET in production
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true, // Set to true if using HTTPS
      // secure: process.env.NODE_ENV === "production", // Use this in production
      sameSite: "none", // Required for cross-origin cookies
      maxAge: 48 * 60 * 60 * 1000, // 2 days
    },
  })
);

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

// Routes
const adminRoutes = require("./routes/adminRoutes");
app.use("/admin", adminRoutes);
const userRoutes = require("./routes/userRoutes");
app.use("/user", userRoutes);
const passRoutes = require("./routes/passRoutes");
app.use("/pass", passRoutes);

// render shows this message when the server is running
app.get("/", (req, res) => {
  res.send("✅ Backend is live");
});

//Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
