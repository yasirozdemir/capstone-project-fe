import { Col } from "react-bootstrap";
import { IMovie } from "../../../interfaces/IMovie";
import "./style.css";
import { BsStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }: props) => {
  return (
    <Col className="d-flex justify-content-center">
      <div className="movie-card">
        <div className="movie-card-body">
          <Link to={`/movie/${movie._id}`}>
            <img src={movie.poster} alt="movie cover" className="img-fluid" />
            <div className="poster-overlay">
              <span>
                {movie.imdbRating}
                <BsStarFill fill="#f5c518" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </Col>
  );
};

interface props {
  movie: IMovie;
}

export default MovieCard;
