//Import the MovieItems component from the relative path
import MovieItems from "./MovieItems.jsx";

// // Define a functional component called Movies that receives props
const Movies = (props) => {
// Use the map function to iterate over the myMovies array passed as a prop
 // For each movie object, return a MovieItems component
 // Pass a unique key using movie.imdbID and pass the movie object as a prop called mymovie
return props.myMovies.map((movie) => {
   return <MovieItems key={movie._id} mymovie={movie}  Reload={props.ReloadData} />;
      
 });
};

// Export the Movies component as the default export of this module
export default Movies;
