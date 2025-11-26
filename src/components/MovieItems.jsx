// Importing React's useEffect hook for handling side-effects in the component lifecycle
import { useEffect } from 'react';

// Importing Bootstrap's Card component to display movie information in a stylized card format
import Card from 'react-bootstrap/Card';

// Importing the Link component from React Router to enable navigation between routes
import { Link } from 'react-router-dom';

// Importing axios for making HTTP requests (used here for deleting a movie)
import axios from 'axios';

// Importing Button component from Bootstrap for styling the delete button
import Button from 'react-bootstrap/Button';

// MovieItem component receives props (movie data and reload function) from its parent component
const MovieItem = (props) => {

  // useEffect hook runs when the 'mymovie' prop changes to handle side effects
  useEffect(() => {
    // Check if the 'mymovie' prop exists to prevent errors in case it's undefined or null
    if (props.myMovie) {
      // Log the movie details to the console for debugging purposes whenever the 'mymovie' prop changes
      console.log("Movie Item:", props.myMovie);
    }
  }, [props.mymovie]); // The effect runs only when the 'mymovie' prop changes

  // handleDelete function is triggered when the user clicks on the delete button
  const handleDelete = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    // Perform a DELETE request to remove the movie from the server
    axios.delete('http://localhost:3000/api/movie/' + props.mymovie._id)
      .then(() => {
        // Once the movie is deleted, call the Reload function passed down from the parent to refresh the movie list
        props.Reload();
      })
      .catch((error) => {
        // Log any errors encountered during the delete operation
        console.error("Error deleting movie:", error);
      });
  };

  // The component returns JSX that renders the UI of the movie item
  return (
    <div>
      {/* Bootstrap Card component used to display movie details in a card */}
      <Card className="text-center">
        
        {/* Card Header: Display the movie's title */}
        <Card.Header>{props.mymovie.title}</Card.Header>

        <Card.Body>
          <blockquote className="blockquote mb-0">
            {/* Movie poster image is displayed, using the 'poster' property of the 'mymovie' prop */}
            {/* Alt text is set to the movie title to improve accessibility */}
            <img src={props.mymovie.poster} alt={props.mymovie.title} />

            {/* Card footer: Display the movie's release year */}
            <footer>{props.mymovie.year}</footer>
          </blockquote>
        </Card.Body>

        {/* Link component: Navigates to an edit page where the movie details can be updated */}
        <Link to={"/edit/" + props.mymovie._id} className="btn btn-primary">Edit</Link>
        
        {/* Bootstrap Button component: Triggers the handleDelete function when clicked */}
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
            
      </Card>
    </div>
  );
}

// Export the MovieItem component so it can be used in other parts of the application
export default MovieItem;
