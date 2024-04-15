// Import required modules
const express = require('express'); // Import Express.js framework
const cors = require('cors'); // Middleware for handling Cross-Origin Resource Sharing
require('dotenv').config(); // Load environment variables from a .env file
const mongoose = require('mongoose'); // MongoDB object modeling tool
const { PrimeRecord } = require('./module/prismaSchema'); // Importing schema for MongoDB
const { isPrime } = require('./primeUtils'); // Importing a function for checking prime numbers

// Create an Express application
const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing for all routes
app.use(express.json()); // Parse JSON bodies of incoming requests

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Define a route for adding new data
app.post('/api/data', async (req, res) => {
  try {
      const { start, end, algorithm } = req.body; // Extract start, end, and algorithm from request body
      console.log("start =", start);
      console.log("end =", end);
      // Calculate prime numbers using isPrime function
      const primes = await isPrime(start, end); // Calculate prime numbers in the given range
      const numPrimes = primes.length; // Calculate the number of primes
      
      // Create a new record with the calculated prime numbers
      const newRecord = new PrimeRecord({
          Date: Date.now(), // Current date and time
          start,
          end,
          algorithm,
          primes, // Store calculated primes in the record
          numPrimes // Assign numPrimes
      });

      await newRecord.save(); // Save the new record to the database
      res.status(201).json(newRecord); // Respond with the newly created record
  } catch (error) {
      console.error('Error adding record:', error);
      res.status(500).json({ message: 'Internal server error' }); // Respond with an error message if something goes wrong
  }

});

// Define a route for fetching all data
app.get('/api/data', async (req, res) => {
  try {
      const records = await PrimeRecord.find(); // Fetch all records from the database
      res.json(records); // Respond with the fetched records
     
  } catch (error) {
      console.error('Error fetching records:', error);
      res.status(500).json({ message: 'Internal server error' }); // Respond with an error message if something goes wrong
  }
});

// Start the server
const PORT = process.env.PORT || 3001; // Use the port specified in environment variables or default to 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
