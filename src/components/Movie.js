import classes from './Movie.module.css';
function Movie(props) {
    console.log(props)
    
   
    return(
         
        <li className={classes.movie}>
        <h2>{props.id}</h2>
      <h3>{props.title}</h3>
      <p>{props.openingText}</p>
      </li>
    )
}
export default Movie;