import logo from './logo.svg';
import './App.css';
import MoviesList from './components/MoviesList';
import { useCallback, useEffect, useState } from 'react';
import AddMovie from './components/AddMovie';

function App() {
  const [moviesData, setMovies] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(null)

   async function addMovieHandler(movie) {
    const response = await fetch("https://movies-a01d9-default-rtdb.firebaseio.com/movies.json", {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json',

      }
    })
    const data = await response.json()
    console.log(data)
   }
   const fetchHandler = useCallback( async () => {
    setLoading(true)
    setError(null)
    try
    {
    const response = await fetch("https://movies-a01d9-default-rtdb.firebaseio.com/movies.json")
    if(!response.ok) {
      throw new Error("Something went wrong")
    }
    const responseData = await response.json()
    console.log(responseData)
    let loadedMovies = [];
    for(const key in responseData) {
      loadedMovies.push({
        id: key,
        title: responseData[key].title,
        openingText: responseData[key].openingText,
        releaseDate: responseData[key].releaseDate
      })

    }
  

    setLoading(false)
    setMovies(loadedMovies)
    }
    catch(error) {
    setError(error.message)
    } 
  }, [])
  useEffect(() => {
    fetchHandler();
  }, [fetchHandler])
  let content = <p>No Data Found</p>
  if(moviesData.length > 0) {
    content = <MoviesList movies={moviesData}></MoviesList>
  }
  if(isError) {
    content = <p>{isError}</p>
  }
  if(isLoading) {
    content = <p>Loading...</p>
  }
  return (
   <>
   <section>
     <AddMovie addMovie={addMovieHandler}></AddMovie>
   </section>
   <section>
     <button onClick={fetchHandler}>Fetch Movies</button>
   </section>
   <section>
    {content}
   </section>
   </>
  );
}

export default App;
