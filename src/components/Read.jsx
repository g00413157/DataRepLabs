// Import the useState and useEffect hooks from React library
import { useEffect, useState } from "react";

// Import the axios library for making HTTP requests
import axios from "axios";

// Import the Movies component from the relative path './Movies.jsx'
import Movies from "./Movies.jsx";

// Define and export a functional component called Read
export default function Read() {

  // Declare a state variable 'myMovies' initialized as an empty array and a setter function 'setMovie'
  const [myMovies, setMovie] = useState([]);

  // Function to reload movie data by making an API request
  const Reload = () => {
    console.log("Reloading movie data...");

    // Make a GET request to fetch movies from the server
    axios.get('http://localhost:3000/api/movies')
      .then((response) => {
        // Update the state 'myMovies' with the data returned from the server
        setMovie(response.data.MyArray);
      })
      .catch((error) => {
        // Log any errors that occur during the API request
        console.error("Error reloading data:", error);
      });
  };

  // The useEffect hook is called when the component mounts (empty dependency array means it runs only once)
  useEffect(() => {
    // Call the Reload function to fetch movie data when the component is first rendered
    Reload();
  }, []); // useEffect provides the component lifecycle behavior

  // The component returns JSX that will render the following elements
  return (
    <div>
      {/* Heading for the movie list */}
      <h1>Movie List</h1>

      {/* Render the Movies component and pass the 'myMovies' data and 'ReloadData' function as props */}
      <Movies myMovies={myMovies} ReloadData={Reload}></Movies>
    </div>
  );
}
