import { Col, Container, Row } from "react-bootstrap";
import "./style.css";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IMovie } from "../../../interfaces/IMovie";
import { toast } from "react-toastify";
import { alertOptions } from "../../../tools";
import MovieCardV2 from "../../reusables/MovieCardV2";
import { ThreeDots } from "react-loader-spinner";
import { BiFirstPage } from "react-icons/bi";

interface ILinks {
  prev?: string;
  next?: string;
  first?: string;
  last?: string;
}

const MoviesPage = () => {
  const [params] = useSearchParams();
  const genres = params.get("genres");
  const limit = params.get("limit");
  const offset = params.get("offset");
  const [pages, setPages] = useState<number | null>(0);
  const [movies, setMovies] = useState<IMovie[] | null>(null);
  const [links, setLinks] = useState<ILinks | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getMovies = async () => {
    const options = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    const URL = `${
      process.env.REACT_APP_API_URL
    }/movies?genres=${genres}&limit=${limit || 15}&offset=${offset || 0}`;
    try {
      setIsLoading(true);
      const res = await fetch(URL, options);
      const data = await res.json();
      console.log({ pages });
      if (res.ok) {
        setMovies(data.movies);
        setLinks(data.links);
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
  }, [genres, limit, offset]);

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
      <Row className="mb-3">
        {links && (
          <Col xs={12}>
            {links.first && (
              <Link to={links.first}>
                <BiFirstPage />
              </Link>
            )}
            {/* {links.prev && <Link to={links.prev}>Prev</Link>}
            {links.next && <Link to={links.next}>Next</Link>}
            {links.last && <Link to={links.last}>Last</Link>} */}
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default MoviesPage;
