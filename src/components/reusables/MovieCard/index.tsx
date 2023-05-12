import { Col } from "react-bootstrap";
import {
  BsBookmarkXFill,
  BsBookmarkCheckFill,
  BsStarFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { IMovie } from "../../../interfaces/IMovie";
import "./style.css";

interface props {
  movie: IMovie;
  isMember?: boolean;
  removeFromWL?: Function;
  saveable?: boolean;
  setMovieIDToSave?: Function;
  setShowWLModal?: Function;
}

const MovieCard = ({
  movie,
  isMember,
  removeFromWL,
  saveable,
  setMovieIDToSave,
  setShowWLModal,
}: props) => {
  return (
    <Col key={movie._id} className="d-flex justify-content-center mb-3">
      <div className="movie-card">
        <div className="movie-card-body">
          <Link to={`/movie/${movie._id}`}>
            <img src={movie.poster} alt="movie cover" className="img-fluid" />
            <div className="poster-overlay-detailed">
              <i>{movie.title}</i>
              <div>
                {movie.genres.map((g, i) => (
                  <span key={i} className="genre-badge">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </Link>
          <div className="second-poster-overlay">
            <span>
              {movie.imdbRating}
              <BsStarFill fill="#f5c518" />
            </span>
            {isMember && removeFromWL && (
              <button
                className="remove"
                onClick={() => {
                  removeFromWL(movie._id);
                }}
              >
                <BsBookmarkXFill />
              </button>
            )}
            {saveable && setMovieIDToSave && setShowWLModal && (
              <button
                className="save"
                onClick={() => {
                  setMovieIDToSave(movie._id);
                  setShowWLModal(true);
                }}
              >
                <BsBookmarkCheckFill />
              </button>
            )}
          </div>
        </div>
      </div>
    </Col>
  );
};

export default MovieCard;
