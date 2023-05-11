import { Col, Container, Row } from "react-bootstrap";
import "./style.css";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IMovie } from "../../../interfaces/IMovie";
import { toast } from "react-toastify";
import { alertOptions } from "../../../tools";
import MovieCardV2 from "../../reusables/MovieCardV2";
import { ThreeDots } from "react-loader-spinner";
import { BsSortAlphaDown, BsSortAlphaDownAlt } from "react-icons/bs";
import GenreDropdown from "../../reusables/GenreDropdown";
import SearchInput from "../../reusables/SearchInput";

export interface IOption {
  label: string;
  value: string;
}

const MoviesPage = () => {
  const [params] = useSearchParams();
  const genres = params.get("genres");
  const page = parseInt(params.get("page") ?? "1");
  const [title, setTitle] = useState("");
  const [pages, setPages] = useState<number | null>(0);
  const [movies, setMovies] = useState<IMovie[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState(true);
  const [allGenres, setAllGenres] = useState<string[]>([]);
  const limit = 15;

  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  const getMovies = async () => {
    const URL = `${
      process.env.REACT_APP_API_URL
    }/movies?limit=${limit}&offset=${(page - 1) * limit || 0}&sort=${
      sortOrder ? "" : "-"
    }title${genres ? `&genres=${genres}` : ""}${
      title ? `&title=/^${title}/i` : ""
    }`;
    try {
      setIsLoading(true);
      const res = await fetch(URL, options);
      const data = await res.json();
      if (res.ok) {
        setMovies(data.movies);
        setPages(data.numberOfPages);
      } else {
        toast.error(data.message, alertOptions);
      }
    } catch (error) {
      toast.error(String(error), alertOptions);
    } finally {
      setIsLoading(false);
    }
  };

  const getGenres = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/movies/genres`);
    if (res.ok) {
      const data = await res.json();
      setAllGenres(data);
    }
  };

  useEffect(() => {
    getGenres();
    setTitle(params.get("title") ?? "");
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getMovies();
    return () => {
      setMovies([]);
    };
    // eslint-disable-next-line
  }, [genres, page, sortOrder, title]);

  return (
    <Container id="movies-page" className="topnav-fix">
      <Row className="control-panel mb-5">
        <Col xs={12} className="d-flex">
          <SearchInput setSearchParam={setTitle} />
          {allGenres && (
            <GenreDropdown currentGenre={genres as string} genres={allGenres} />
          )}
          <button
            onClick={() => {
              setSortOrder(!sortOrder);
            }}
          >
            Sort
            {sortOrder ? (
              <BsSortAlphaDownAlt
                className="ml-2"
                style={{ fontSize: "1.5rem" }}
              />
            ) : (
              <BsSortAlphaDown
                className="ml-2"
                style={{ fontSize: "1.5rem" }}
              />
            )}
          </button>
        </Col>
      </Row>
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
      <Row xs={1} sm={2} md={3} lg={5} className="pt-3">
        {movies ? (
          <>
            {movies.map(
              (movie) =>
                movie && <MovieCardV2 key={movie._id} movie={movie} saveable />
            )}
          </>
        ) : (
          "Nothing to show!"
        )}
      </Row>
      <Row className="mb-3 justify-content-center mt-auto">
        <Col
          xs={12}
          className="d-flex justify-content-center"
          style={{ gap: "0.5rem", flexWrap: "wrap" }}
        >
          {movies?.length !== 0 &&
            pages &&
            pages !== 0 &&
            Array.from({ length: pages }, (_, i) => (
              <Link
                key={i}
                to={`/movies?page=${i + 1}${genres ? `&genres=${genres}` : ""}${
                  title ? `&title=${title}` : ""
                }`}
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
