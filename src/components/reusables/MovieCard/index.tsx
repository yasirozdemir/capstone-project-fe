import { IMovie } from "../../../interfaces/IMovie";

const MovieCard = ({ movie }: props) => {
  return (
    <div className="movie-card">
      <img src={movie.image?.src} alt="movie cover" className="w-100 h-100" />
      <p>{movie.name}</p>
    </div>
  );
};

interface props {
  movie: IMovie;
}

export default MovieCard;
