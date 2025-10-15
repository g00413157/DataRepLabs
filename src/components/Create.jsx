// Import the useState hook from React to manage local component state
import { useState } from "react";

// Define a functional React component named 'Create'
function Create() {
  // Declare state variables for the movie's title, year, and poster URL
  const [title, setTitle] = useState('');     // Initially empty string
  const [year, setYear] = useState('');
  const [poster, setPoster] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior (page reload)
    console.log(title, year, poster); // Log the current input values to the console
  }

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
            onChange={(e) => { setTitle(e.target.value) }} // Update state on input change
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
            onChange={(e) => { setYear(e.target.value) }} // Update state on input change
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
            onChange={(e) => { setPoster(e.target.value) }} // Update state on input change
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
