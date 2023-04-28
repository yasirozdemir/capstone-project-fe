import { Col } from "react-bootstrap";
import { IMovie } from "../../../interfaces/IMovie";
import "./style.css";

const MovieCard = ({ movie }: props) => {
  const imdbURL = `https://www.imdb.com/title/${movie.imdbID}`;
  return (
    <Col className="d-flex">
      <div className="movie-card">
        <div>
          <img src={movie.poster} alt="movie cover" className="img-fluid" />
        </div>
        <div>
          <p className="m-0">{movie.title}</p>
          <a href={imdbURL} rel="noreferrer" target="_blank">
            imdb
          </a>
        </div>
      </div>
    </Col>
  );
};

interface props {
  movie: IMovie;
}

export default MovieCard;
