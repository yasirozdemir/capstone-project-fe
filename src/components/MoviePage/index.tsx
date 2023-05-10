import { Col, Container, Row } from "react-bootstrap";
import "./style.css";
import React, { useEffect, useState } from "react";
import { IMovie } from "../../interfaces/IMovie";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  IColor,
  alertOptions,
  colorToRgba,
  durationToHM,
  fullDateToYear,
  getAverageColorFromImage,
} from "../../tools";
import { BsStarFill, BsBookmarksFill } from "react-icons/bs";
import WLModal from "../modals/WLModal";
import BG from "../reusables/BG";

function formatArrays(arr: Array<string>): JSX.Element[] {
  return arr
    .filter((m) => m)
    .map((m, i, arr) => (
      <React.Fragment key={i}>
        {m}
        {i !== arr.length - 1 && " ∙ "}
      </React.Fragment>
    ));
}

const MoviePage = () => {
  const { movieID } = useParams();
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [showWLModal, setShowWLModal] = useState(false);
  const [primColor, setPrimColor] = useState("");
  const getMovie = async () => {
    const options = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    const URL = `${process.env.REACT_APP_API_URL}/movies/${movieID}`;
    const res = await fetch(URL, options);
    const data = await res.json();
    if (res.ok) {
      setMovie(data);
      document.title = `What a Movie | ${data.title}`;
      const avColor = await getAverageColorFromImage(data.poster);
      setPrimColor(colorToRgba(avColor as IColor));
    } else {
      toast.error(data.message, alertOptions);
    }
  };

  useEffect(() => {
    getMovie();
    // eslint-disable-next-line
  }, [movieID]);

  return (
    <Container id="movie-page" className="topnav-fix mb-3 mb-md-0">
      {movie && (
        <>
          <BG colors={[primColor, "#2E2E2E"]} to="bottom" />
          <div id="movie-detail-wrapper">
            <Row className="flex-column flex-md-row mb-3">
              <Col
                xs={12}
                md={9}
                className="d-flex flex-column align-items-center align-items-md-start justify-content-center text-center text-md-left"
              >
                <h2 className="m-0">{movie.title}</h2>
                <div
                  className="d-flex justify-content-center"
                  style={{ columnGap: "0.5rem", flexWrap: "wrap" }}
                >
                  {fullDateToYear(movie.released)}
                  <span>∙</span>
                  {movie.rated}
                  <span>∙</span>
                  {durationToHM(movie.duration)}
                  <span>∙</span>
                  <span className="d-flex align-items-center justify-content-center">
                    {movie.imdbRating}
                    <BsStarFill fill="#f5c518" className="ml-1" />
                  </span>
                </div>
              </Col>
              <Col className="d-flex flex-column align-items-center align-items-md-end ml-auto">
                <button
                  id="saveToWLBtn"
                  className="mt-2 mt-md-0"
                  onClick={() => {
                    setShowWLModal(!showWLModal);
                  }}
                >
                  <BsBookmarksFill /> Save
                </button>
                <WLModal
                  movieID={movieID}
                  showWLModal={showWLModal}
                  setShowWLModal={setShowWLModal}
                />
              </Col>
            </Row>
            <Row className="align-items-md-center">
              <Col
                xs={12}
                md={4}
                className="d-flex justify-content-center justify-content-md-start mb-2 mb-md-0"
              >
                <div className="poster-wrapper">
                  <img
                    src={movie.poster}
                    alt="movie poster"
                    className="img-fluid"
                  />
                </div>
              </Col>
              <Col xs={12} md={8} style={{ fontSize: "1.2rem" }}>
                {movie.genres.length >= 1 && (
                  <div className="genre-wrapper mb-2 justify-content-center justify-content-md-start">
                    {movie.genres.map((g, i) => (
                      <Link
                        to={"/movies/" + g.toLowerCase()}
                        key={i}
                        className="genre-badge"
                      >
                        {g}
                      </Link>
                    ))}
                  </div>
                )}
                {movie.description.length >= 1 && (
                  <div className="movie-info-rows">
                    <i>Description:</i>
                    <p className="m-0">{movie.description}</p>
                  </div>
                )}
                {movie.director.length >= 1 && (
                  <div className="movie-info-rows">
                    <i>Director{movie.director.length > 1 ? "s" : ""}:</i>
                    <p className="m-0">{formatArrays(movie.director)}</p>
                  </div>
                )}
                {movie.writer.length >= 1 && (
                  <div className="movie-info-rows">
                    <i>Writer{movie.writer.length > 1 ? "s" : ""}:</i>
                    <p className="m-0">{formatArrays(movie.writer)}</p>
                  </div>
                )}
                {movie.actors.length >= 1 && (
                  <div className="movie-info-rows">
                    <i>Star{movie.actors.length > 1 ? "s" : ""}:</i>
                    <p className="m-0">{formatArrays(movie.actors)}</p>
                  </div>
                )}
              </Col>
            </Row>
          </div>
        </>
      )}
    </Container>
  );
};

export default MoviePage;
