const express = require("express");
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(
  session({
    secret: "secret123", // use process.env.SECRET in production
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 days
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

//Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
