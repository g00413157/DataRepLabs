// Importing React's useEffect hook for side-effects and Bootstrap's Card component for UI
import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

// MovieItem component receives props as input
const MovieItem = (props) => {
  
  // useEffect hook runs when the 'mymovie' prop changes
  useEffect(() => {
    // Check if the 'mymovie' prop exists to avoid errors in case it's undefined
    if (props.myMovie) {
      // Log the movie details to the console for debugging when 'mymovie' changes
      console.log("Movie Item:", props.myMovie);
    }
  }, [props.mymovie]); // Dependency array ensures the effect runs only when 'mymovie' changes

  // Return the JSX that represents the component UI
  return (
    <div>
      {/* Bootstrap Card component to display movie details */}
      <Card className="text-center">
        
        {/* Movie title displayed in the Card header */}
        <Card.Header>{props.mymovie.title}</Card.Header>

        <Card.Body>
          <blockquote className="blockquote mb-0">
            {/* Movie poster image, src attribute is set to the poster URL passed in the 'mymovie' prop */}
            {/* 'alt' text is set to the movie title for accessibility */}
            <img src={props.mymovie.poster} alt={props.mymovie.title} />
            {/* Movie release year displayed in the Card footer */}
            <footer>{props.mymovie.year}</footer>
          </blockquote>
        </Card.Body>
        <Link to={"/edit/" + props.mymovie._id} className="btn btn-primary">Edit</Link>
      </Card>
    </div>
  );
}

// Export the MovieItem component for use in other parts of the app
export default MovieItem;
