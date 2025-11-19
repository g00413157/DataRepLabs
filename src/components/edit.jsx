// Import necessary libraries from React and other packages
import React from 'react'; // React library for building UI components
import { useParams } from 'react-router-dom'; // Hook to get route parameters (e.g., movie ID)
import { useState, useEffect } from 'react'; // useState for managing component state, useEffect for side-effects like fetching data
import axios from 'axios'; // axios library for making HTTP requests
import { useNavigate } from "react-router-dom"; // Hook to navigate programmatically (e.g., after submitting the form)

// Define the Edit component which will allow the user to edit a movie
export default function Edit(props) {
  // Extract the movie ID from the URL parameters
  let { id } = useParams();

  // Declare state variables to store movie data
  const [title, setTitle] = useState("");  // Movie title
  const [year, setYear] = useState("");    // Movie release year
  const [poster, setPoster] = useState(""); // Movie poster URL

  // useNavigate hook to navigate to another route after form submission
  const navigate = useNavigate();

  // useEffect hook runs when the component mounts or the 'id' changes
  useEffect(() => {
    // Make a GET request to fetch the movie data using the movie ID from the URL
    axios.get('http://localhost:3000/api/movies/' + id)
      .then((response) => {
        // If successful, set the form fields with the movie data
        setTitle(response.data.title);
        setYear(response.data.year);
        setPoster(response.data.poster);
      })
      .catch((error) => {
        // Log any errors that occur during the GET request
        console.log(error);
      });
  }, [id]); // Dependency array: only run when 'id' changes

  // handleSubmit function is triggered when the form is submitted
  const handleSubmit = (event) => {
    // Prevent the default form submission behavior (page reload)
    event.preventDefault();

    // Create a new movie object with the updated form data
    const newMovie = { id, title, year, poster };

    // Make a PUT request to update the movie with the provided data
    axios.put('http://localhost:3000/api/movies/' + id, newMovie)
      .then((res) => {
        // Log the response after successfully updating the movie
        console.log(res.data);
        // Navigate the user to the '/read' route after the update
        navigate('/read');
      });
  }

  return (
    <div>
      {/* Form to edit movie details */}
      <form onSubmit={handleSubmit}>
        {/* Input field for movie title */}
        <div className="form-group">
          <label>Movie Title: </label>
          <input type="text"
            className="form-control"
            value={title} // Bind input value to state variable 'title'
            onChange={(e) => setTitle(e.target.value)} // Update state on input change
          />
        </div>
        
        {/* Input field for movie release year */}
        <div className="form-group">
          <label>Release Year: </label>
          <input type="text"
            className="form-control"
            value={year} // Bind input value to state variable 'year'
            onChange={(e) => setYear(e.target.value)} // Update state on input change
          />
        </div>
        
        {/* Input field for movie poster URL */}
        <div className="form-group">
          <label>Poster URL: </label>
          <input type="text"
            className="form-control"
            value={poster} // Bind input value to state variable 'poster'
            onChange={(e) => setPoster(e.target.value)} // Update state on input change
          />
        </div>
        
        {/* Submit button to trigger the form submission */}
        <div className="form-group">
          <input type="submit" value="Edit Movie" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}
