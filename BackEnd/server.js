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

// Define a simple route to respond with "Hello World" when accessing the root URL
app.get('/', (req, res) => {
    res.send('Hello World'); // Respond with 'Hello World'
});

// Define a route to serve the list of movies as a JSON response
app.get('/api/movies', (req, res) => {
    // Sample data representing an array of movie objects
    const myMovies = [
        {
            "Title": "Avengers: Infinity War (server)",
            "Year": "2018",
            "imdbID": "tt4154756",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
        },
        {
            "Title": "Captain America: Civil War (server)",
            "Year": "2016",
            "imdbID": "tt3498820",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
        },
        {
            "Title": "World War Z (server)",
            "Year": "2013",
            "imdbID": "tt0816711",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
        }
    ]
    
    // Send the movie data as a JSON response
    res.json({ myArray: myMovies });
});

// Start the server and listen on the specified port
app.listen(port, () => {
    // Log to the console that the server is running and provide the URL to access it
    console.log(`Server is running on http://localhost:${port}`);
});

// Define a POST route to handle adding a new movie (or any other POST request to the '/api/movies' endpoint)
app.post('/api/movies', (req, res) => {
    // Log the incoming request body (the movie data sent by the client)
    console.log(req.body);
    // Respond with a message confirming the POST request was received
    res.send('POST request to movies Endpoint');
});
