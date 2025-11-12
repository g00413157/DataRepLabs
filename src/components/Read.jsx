// Import the Movies component from the relative path
import { useEffect, useState } from "react"//imports useState 
import axios from "axios";
import Movies from "./Movies.jsx"

// Define and export a functional component called Read
export default function Read() {

  const [myMovies,setMovie] = useState([]); //Gives Access to global variable

  useEffect(
      ()=>{
        //do some http client work
          axios.get('http://localhost:3000/api/movies')
          .then((response)=>{
            console.log(response.data);
            setMovie(response.data.MyArray);
          })
          .catch((error)=>{console.log(error)});//catches any errors 

      },[]
  );// gives componenet Life cycle

  // The component returns JSX to render
  return (
    <div>
      {/* Heading for the movie list */}
      <h1>Movie List</h1>

      {/* Render the Movies component ' */}
      <Movies myMovies={myMovies} ></Movies>
    </div>
  )
}
