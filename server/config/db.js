// db.js
// This file handles the connection to the MongoDB database.
// It uses Mongoose to establish the connection and handle errors.
// It exports a function that can be called to connect to the database.
// It also uses environment variables to store the MongoDB URI.
// Note: It is important to keep sensitive information like database URIs out of version control.
// This is done by using environment variables and a .env file.^


const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Pull MongoDB URI from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`MongoDB Connection Error: ${err.message}`);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
