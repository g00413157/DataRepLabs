import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();
const port = 3000;

// CORS middleware
app.use(cors());
// Import 'path' module to work with file and directory paths
import path from 'path';
// Import 'fileURLToPath' to convert the URL to a file path 
import { fileURLToPath } from 'url';

// Convert the current module's URL  into a file path
const __filename = fileURLToPath(import.meta.url);

// Get the directory name of the current file 
const __dirname = path.dirname(__filename);

// Serve static files from the Vite build output (located in the 'dist' directory)
app.use(express.static(path.join(__dirname, '../dist')));



// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://admin:admin@datarepcluster.ofryorq.mongodb.net/?appName=DataRepCluster')
 
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  });

// Movie Schema and Model
const movieSchema = new mongoose.Schema({
  title: String,
  year: String,
  poster: String,
});

const movieModel = mongoose.model('Movie', movieSchema);

// Routes

// GET all movies
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await movieModel.find({});
    res.json({ MyArray: movies });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch movies', error: error.message });
  }
});

// GET a single movie by ID
app.get('/api/movies/:id', async (req, res) => {
  try {
    const movie = await movieModel.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch movie', error: error.message });
  }
});

// POST a new movie
app.post('/api/movies', async (req, res) => {
  try {
    const newMovie = new movieModel(req.body);
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add movie', error: error.message });
  }
});

// PUT (update) an existing movie by ID
app.put('/api/movies/:id', async (req, res) => {
  try {
    const updatedMovie = await movieModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update movie', error: error.message });
  }
});

// DELETE a movie by ID
app.delete('/api/movie/:id', async (req, res) => {
  try {
    const movie = await movieModel.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json({ message: 'Movie deleted successfully', movie });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting movie', error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
app.get('/{*any}', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})