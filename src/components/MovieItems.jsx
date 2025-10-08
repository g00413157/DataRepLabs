import { useEffect } from "react";
import Card from 'react-bootstrap/Card';

const MovieItem = (props) => {
  // useEffect runs when 'mymovie' prop changes
  useEffect(() => {
    // Only log if 'mymovie' prop is defined to avoid errors
    if (props.mymovie) {
      console.log("Movie Item:", props.mymovie);
    }
  }, [props.mymovie]); // Dependency array to run effect on 'mymovie' changes

  // If 'mymovie' exists, render the movie details inside a Bootstrap Card
  return (
    <div>
      <Card className="text-center">
        {/* Movie title displayed in the Card header */}
        <Card.Header>{props.mymovie.Title}</Card.Header>

        <Card.Body>
          <blockquote className="blockquote mb-0">
            {/* Movie poster image with alt text for accessibility */}
            <img src={props.mymovie.Poster} alt={props.mymovie.Title} />
            {/* Movie release year displayed in the footer */}
            <footer>{props.mymovie.Year}</footer>
          </blockquote>
        </Card.Body>
      </Card>
    </div>
  );
}

export default MovieItem;
