// Import required modules
const express = require('express'); // Importing the Express framework
const cors = require('cors'); // Importing CORS middleware for handling Cross-Origin Resource Sharing
require('dotenv').config(); // Loading environment variables from a .env file
const mongoose = require('mongoose'); // Importing Mongoose for MongoDB object modeling
const { PrimeRecord } = require('./module/prismaSchema'); // Importing the PrimeRecord model from a local module

// Create an Express application
const app = express();

// Middleware setup
app.use(cors()); // Allow Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI, { // Connecting to the MongoDB URI specified in the environment variables
    useNewUrlParser: true, // Using new URL parser
    useUnifiedTopology: true, // Using new server discovery and monitoring engine
  })
  .then(() => {
    console.log('MongoDB connected'); // Log success message if connected to MongoDB
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err); // Log error message if failed to connect to MongoDB
  });

// Define a route for adding new data
app.post('/api/data', async (req, res) => {
    try {
      const { start, end, algorithm, numPrimes } = req.body; // Extracting data from request body
      const newRecord = new PrimeRecord({ // Creating a new PrimeRecord instance with provided data
        Date: Date.now(), // Current date and time
        start,
        end,
        algorithm,
        numPrimes
      });
      await newRecord.save(); // Saving the new record to the database
      res.status(201).json({ message: 'Record added successfully' }); // Sending success response
    } catch (error) {
      console.error('Error adding record:', error); // Log error if failed to add record
      res.status(500).json({ message: 'Internal server error' }); // Sending error response
    }
  });

// Define a route for fetching all data
app.get('/api/data', async (req, res) => {
    try {
      const records = await PrimeRecord.find(); // Fetching all records from the database
      res.json(records); // Sending fetched records as JSON response
    } catch (error) {
      console.error('Error fetching records:', error); // Log error if failed to fetch records
      res.status(500).json({ message: 'Internal server error' }); // Sending error response
    }
  });

// Define a test route
app.get('/api/datas', (req, res) => {
    res.json({ message: 'Hello from backend!' }); // Sending a simple JSON response
  });

// Start the server
const PORT = process.env.PORT || 3001; // Using specified port from environment variables or default to 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Log message indicating the server is running
});
