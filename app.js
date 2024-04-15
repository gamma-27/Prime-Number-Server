// Import required modules
const express = require('express'); // Import Express framework
const cors = require('cors'); // Import CORS middleware for cross-origin requests
require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose'); // Import mongoose for MongoDB interactions
const { PrimeRecord } = require('./module/prismaSchema'); // Import PrimeRecord model
const { isPrime } = require('./primeUtils'); // Import isPrime function from primeUtils

// Create an Express application
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected'); // Log successful database connection
})
.catch((err) => {
    console.error('MongoDB connection error:', err); // Log database connection error
});

// Define a route for adding new data
app.post('/api/data', async (req, res) => {
  try {
      const { start, end, algorithm } = req.body; // Extract start, end, and algorithm from request body
      console.log("start =", start); // Log start value
      console.log("end =", end); // Log end value
      
      // Calculate prime numbers using isPrime function
      const primes = await isPrime(start, end);
      const numPrimes = primes.length; // Calculate the number of primes
      
      // Create a new PrimeRecord instance
      const newRecord = new PrimeRecord({
          Date: Date.now(), // Current date and time
          start, // Start range
          end, // End range
          algorithm, // Algorithm used
          primes, // Store calculated primes in the record
          numPrimes // Number of primes
      });

      await newRecord.save(); // Save the new record to the database
      res.status(201).json(newRecord); // Send response with the new record
  } catch (error) {
      console.error('Error adding record:', error); // Log error
      res.status(500).json({ message: 'Internal server error' }); // Send internal server error response
  }

});

// Define a route for fetching all data
app.get('/api/data', async (req, res) => {
  try {
      const records = await PrimeRecord.find(); // Fetch all prime number records from the database
      res.json(records); // Send response with fetched records
  } catch (error) {
      console.error('Error fetching records:', error); // Log error
      res.status(500).json({ message: 'Internal server error' }); // Send internal server error response
  }
});

// Define a test route

// Start the server
const PORT = process.env.PORT || 3001; // Use specified port or default to 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // Log server start message
});
