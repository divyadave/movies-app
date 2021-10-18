import Movie from './Movie';
import classes from './MoviesList.module.css';

function MoviesList(props) {
    console.log('props', props)
    return(
       <ul className={classes['movies-list']}>
           {
           props.movies.map((movie) => (
                  <Movie id={movie['id']} title={movie.title} openingText={movie.openingText} releaseDate={movie['releaseDate']}></Movie>
               ))
           }
       </ul>
    );

}
export default MoviesList;