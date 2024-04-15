// Import required modules
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const { PrimeRecord } = require('./module/prismaSchema');
const {isPrime} = require('./primeUtils')
// Create an Express application
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

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

// Function to calculate prime numbers using Sieve of Eratosthenes






// Define a route for adding new data
// Define a route for adding new data
// Define a route for adding new data
app.post('/api/data', async (req, res) => {
  try {
      const { start, end, algorithm } = req.body;
      console.log("start =", start);
      console.log("end =", end);
      // Calculate prime numbers using isPrime function
      const primes =await isPrime(start, end);
      const numPrimes = primes.length; // Calculate the number of primes
      
      const newRecord = new PrimeRecord({
          Date: Date.now(),
          start,
          end,
          algorithm,
          primes, // Store calculated primes in the record
          numPrimes // Assign numPrimes
      });

      await newRecord.save();
      res.status(201).json(newRecord);
  } catch (error) {
      console.error('Error adding record:', error);
      res.status(500).json({ message: 'Internal server error' });
  }

});


// Define a route for fetching all data
// Define a route for fetching all data
app.get('/api/data', async (req, res) => {
  try {
      const records = await PrimeRecord.find();
      res.json(records);
     
  } catch (error) {
      console.error('Error fetching records:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});


// Define a test route


// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
