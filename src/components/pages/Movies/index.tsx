import { Col, Container, Row } from "react-bootstrap";
import "./style.css";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IMovie } from "../../../interfaces/IMovie";
import { toast } from "react-toastify";
import { alertOptions } from "../../../tools";
import MovieCard from "../../reusables/MovieCard";
import { ThreeDots } from "react-loader-spinner";
import GenreDropdown from "../../reusables/GenreDropdown";
import SearchInput from "../../reusables/SearchInput";
import WLModal from "../../modals/WLModal";
import SortDropdown from "../../reusables/SortDropdown";

export interface IOption {
  label: string;
  value: string;
}

const MoviesPage = () => {
  const [params] = useSearchParams();
  const genres = params.get("genres");
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("");
  const [pages, setPages] = useState<number | null>(0);
  const [movies, setMovies] = useState<IMovie[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sort, setSort] = useState<{
    criteria: string | null;
    order: string;
  }>({ criteria: null, order: "" });
  const [allGenres, setAllGenres] = useState<string[]>([]);
  const [showWLModal, setShowWLModal] = useState(false);
  const [movieIDToSave, setMovieIDToSave] = useState("");
  const limit = 15;

  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  const getMovies = async () => {
    const URL = `${
      process.env.REACT_APP_API_URL
    }/movies?limit=${limit}&offset=${(page - 1) * limit || 0}${
      sort.criteria ? `&sort=${sort.order}${sort.criteria}` : ""
    }${genres ? `&genres=${genres}` : ""}${title ? `&title=/^${title}/i` : ""}`;
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
    document.title = "What a Movie | Movies";
    setTitle(params.get("title") ?? "");
    setPage(parseInt(params.get("page") ?? "1"));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getMovies();
    return () => {
      setMovies([]);
    };
    // eslint-disable-next-line
  }, [genres, page, sort, title]);

  return (
    <Container id="movies-page" className="topnav-fix">
      <Row className="control-panel mt-4 mb-5">
        <Col
          xs={12}
          className="d-flex flex-column flex-md-row"
          style={{ gap: "0.5rem" }}
        >
          <SearchInput setSearchParam={setTitle} setPage={setPage} />
          <div
            className="d-flex justify-content-end justify-content-md-center"
            style={{ gap: "inherit", flexWrap: "wrap" }}
          >
            <SortDropdown sort={sort} setSort={setSort} />
            {allGenres && (
              <GenreDropdown
                currentGenre={genres as string}
                genres={allGenres}
              />
            )}
          </div>
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
      <WLModal
        showWLModal={showWLModal}
        setShowWLModal={setShowWLModal}
        movieID={movieIDToSave}
      />
      <Row xs={1} sm={2} md={3} lg={5} className="pt-3">
        {movies ? (
          <>
            {movies.map(
              (movie) =>
                movie && (
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    saveable
                    setMovieIDToSave={setMovieIDToSave}
                    setShowWLModal={setShowWLModal}
                  />
                )
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
              <button
                key={i}
                onClick={() => {
                  setPage(i + 1);
                }}
                className={
                  page === i + 1 ? "pagination-btn current" : "pagination-btn"
                }
              >
                {i + 1}
              </button>
            ))}
        </Col>
      </Row>
    </Container>
  );
};

export default MoviesPage;
