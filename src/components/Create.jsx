// Import the useState hook from React to manage local component state
import { useState } from "react";
import axios from "axios";

// Define a functional React component named 'Create'
function Create() {
  // Declare state variables for the movie's title, year, and poster URL
  const [title, setTitle] = useState('');     // Initially empty string for title
  const [year, setYear] = useState('');       // Initially empty string for year
  const [poster, setPoster] = useState('');   // Initially empty string for poster URL

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    
    // Log the current state values to the console
    console.log(`Title: ${title}, Year: ${year}, Poster: ${poster}`);
    
    // Create an object with the movie data
    const movie = {
      title: title,
      year: year,
      poster: poster
    };
    
    // Send a POST request to the backend API to add a new movie
    axios.post('http://localhost:3000/api/movies', movie)
      .then((res) => console.log(res.data))  // Log the response data from the server
      .catch((err) => console.log(err.data)); // Log any errors if the request fails
  };

  // Return the component's UI
  return (
    <div>
      <h2>This is my Create Component.</h2>

      {/* Form to collect movie data */}
      <form onSubmit={handleSubmit}>
        
        {/* Movie Title Input */}
        <div className="form-group">
          <label>Add Movie Title: </label>
          <input
            type="text"
            className="form-control"
            value={title} // Controlled input bound to title state
            onChange={(e) => { setTitle(e.target.value) }} // Update state when input changes
          />
          <br />
        </div>

        {/* Movie Year Input */}
        <div className="form-group">
          <label>Add Movie Year: </label>
          <input
            type="text"
            className="form-control"
            value={year} // Controlled input bound to year state
            onChange={(e) => { setYear(e.target.value) }} // Update state when input changes
          />
          <br />
        </div>

        {/* Movie Poster URL Input */}
        <div className="form-group">
          <label>Add Movie Poster: </label>
          <input
            type="text"
            className="form-control"
            value={poster} // Controlled input bound to poster state
            onChange={(e) => { setPoster(e.target.value) }} // Update state when input changes
          />
          <br />
        </div>

        {/* Submit Button */}
        <input type="submit" value="Add Movie" />
      </form>
    </div>
  );
}

// Export the component so it can be used in other parts of the app
export default Create;
