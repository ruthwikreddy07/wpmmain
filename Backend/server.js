const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require('cors');
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB connect
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/items", require("./routes/itemRoutes"));

// Make the 'uploads' folder public so images can be viewed
app.use("/uploads", express.static("uploads"));
app.use("/api", require("./routes/claimRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));