const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const menuRoutes = require("./routes/menuRoutes");

const app = express();
app.use(cors({
    origin: ["https://restaurant-menu-app-red.vercel.app/", "http://localhost:5000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }));
app.use(express.json());

app.use("/api/menus", menuRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

  app.get("/", (req, res) => {
  res.send("Backend is running!");
});
