import { Col } from "react-bootstrap";
import { BsBookmarkXFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IMovie } from "../../../interfaces/IMovie";
import "./style.css";

const MovieCardV2 = ({ movie, isMember, removeFromWL }: props) => {
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
          {isMember && (
            <div className="second-poster-overlay">
              <button
                onClick={() => {
                  removeFromWL(movie._id);
                }}
              >
                <BsBookmarkXFill />
              </button>
            </div>
          )}
        </div>
      </div>
    </Col>
  );
};

interface props {
  movie: IMovie;
  isMember: boolean;
  removeFromWL: Function;
}

export default MovieCardV2;
