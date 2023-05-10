import { Col, Container, Row } from "react-bootstrap";
import "./style.css";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IMovie } from "../../../interfaces/IMovie";
import { toast } from "react-toastify";
import { alertOptions } from "../../../tools";
import MovieCardV2 from "../../reusables/MovieCardV2";
import { ThreeDots } from "react-loader-spinner";

const MoviesPage = () => {
  const [params] = useSearchParams();
  const genres = params.get("genres");
  const page = parseInt(params.get("page") ?? "1");
  const [pages, setPages] = useState<number | null>(0);
  const [movies, setMovies] = useState<IMovie[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 15;

  const getMovies = async () => {
    const options = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    const URL = `${
      process.env.REACT_APP_API_URL
    }/movies?genres=${genres}&limit=${limit}&offset=${(page - 1) * limit || 0}`;
    try {
      setIsLoading(true);
      const res = await fetch(URL, options);
      const data = await res.json();
      if (res.ok) {
        setMovies(data.movies);
        setPages(data.numberOfPages);
      } else {
        toast(data.message, alertOptions);
      }
    } catch (error) {
      toast(String(error), alertOptions);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
    // eslint-disable-next-line
  }, [genres, page]);

  return (
    <Container id="movies-page" className="topnav-fix">
      {isLoading && (
        <Row>
          <ThreeDots
            height="80"
            width="80"
            radius="8"
            color="#fefefe"
            wrapperClass="mx-auto"
            wrapperStyle={{ marginTop: "5rem" }}
            visible={true}
          />
        </Row>
      )}
      <Row xs={1} sm={2} md={3} lg={5} className="pt-3 justify-content-center">
        {movies?.map(
          (movie) =>
            movie && <MovieCardV2 key={movie._id} movie={movie} saveable />
        )}
      </Row>
      <Row className="mb-3 justify-content-center mt-auto">
        <Col
          xs={12}
          className="d-flex justify-content-center"
          style={{ gap: "0.5rem", flexWrap: "wrap" }}
        >
          {pages &&
            Array.from({ length: pages }, (_, i) => (
              <Link
                key={i}
                to={`/movies?genres=${genres}&page=${i + 1}`}
                className={
                  page === i + 1 ? "pagination-link current" : "pagination-link"
                }
              >
                {i + 1}
              </Link>
            ))}
        </Col>
      </Row>
    </Container>
  );
};

export default MoviesPage;
