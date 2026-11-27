// Import the Mongoose library for MongoDB interactions
const mongoose = require("mongoose");

// Asynchronous function to establish a connection to the MongoDB database
const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from environment variables
    // Options ensure the new URL parser and unified topology engine are used
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // Log a success message when the connection is established
    console.log("✅ MongoDB Connected");
  } catch (error) {
    // Log an error message and exit the process if the connection fails
    console.error("❌ DB Connection Failed", error);
    process.exit(1);
  }
};

// Export the connectDB function for use in the application entry point
module.exports = connectDB;
