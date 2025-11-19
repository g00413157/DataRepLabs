// Import the express module to create an Express application
import express from 'express';

// Create an Express application instance
const app = express();

// Set the port number for the server to listen on
const port = 3000;

// Import the CORS middleware to handle cross-origin requests
import cors from 'cors';
// Use CORS middleware to allow cross-origin requests from any origin
app.use(cors());

// Middleware to manually set CORS headers for handling preflight requests and specific HTTP methods
app.use(function(req, res, next) {
  // Allow any origin to access the server
  res.header("Access-Control-Allow-Origin", "*");
  // Allow specific HTTP methods in CORS requests
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  // Allow specific request headers for CORS
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next(); // Continue to the next middleware or route handler
});

// Import body-parser to handle incoming request data
import bodyParser from 'body-parser';
// Use body-parser middleware to parse URL-encoded data from form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use body-parser middleware to parse JSON data from requests
app.use(bodyParser.json());

// Import mongoose to interact with the MongoDB database
import mongoose from 'mongoose';
// Connect to the MongoDB database using the connection string (replace credentials as needed)
mongoose.connect('mongodb+srv://admin:admin@datarepcluster.ofryorq.mongodb.net/?appName=DataRepCluster');

// Define the movie schema for storing movie data in the MongoDB database
const movieSchema = new mongoose.Schema({
  title: String,  // Movie title
  year: String,   // Release year of the movie
  poster: String  // URL or path to the movie's poster image
});

// Create a model based on the movie schema, which allows us to interact with the database
const movieModel = mongoose.model('Movie', movieSchema);

// Define a route to serve the list of movies as a JSON response
app.get('/api/movies', async (req, res) => {
  // Fetch all movies from the database
  const movies = await movieModel.find({});
  // Respond with the list of movies in a JSON format
  res.json({ MyArray: movies });
});

// Define a route to fetch a single movie by its ID
app.get('/api/movies/:id', async (req, res) => {
    // Fetch the movie from the database by its ID
    let movie = await movieModel.findById({ _id: req.params.id });
    // Send the movie as a response
    res.send(movie);
});

// Define a route to update an existing movie by its ID
app.put('/api/movies/:id', async (req, res) => {
    // Find the movie by its ID and update it with the new data from the request body
    let movie = await movieModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // Send the updated movie as the response
    res.send(movie);
});

// Start the server and listen on the specified port
app.listen(port, () => {
  // Log to the console that the server is running and provide the URL to access it
  console.log(`Server is running on http://localhost:${port}`);
});

// Define a POST route to handle adding a new movie
app.post('/api/movies', async (req, res) => {
  try {
    // Create a new movie instance based on the request body data
    const newMovie = new movieModel({
      title: req.body.title,  // Title of the movie from the request body
      year: req.body.year,    // Release year of the movie from the request body
      poster: req.body.poster, // Poster image URL/path from the request body
    });

    // Save the new movie to the database
    const savedMovie = await newMovie.save();

    // Send back the saved movie as the response with a 201 status (created)
    res.status(201).json(savedMovie);
  } catch (error) {
    // If an error occurs, send a 500 response with the error message
    res.status(500).json({ message: 'Failed to add movie', error: error.message });
  }
});
