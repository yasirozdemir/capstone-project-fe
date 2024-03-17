import { useState, useEffect } from "react";
import { IMovie } from "../../../interfaces/IMovie";
import "./style.css";
import { Col, Container, Row } from "react-bootstrap";
import Typewriter from "typewriter-effect";
import { TbMoodSearch } from "react-icons/tb";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { slicedStore } from "../../../redux/slices";
import MovieCard from "../../reusables/MovieCard";
import WLModal from "../../modals/WLModal";
import NavCustom from "../../reusables/Nav";

// The following import is unnecessary for production, it's just for developers to style the page
// import { sampleMoviesArray } from "../../../assets/sampleMovies";

const MovieAdvisor = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const moviesRedux = useAppSelector((st) => st.store.movies);
  const [showWLModal, setShowWLModal] = useState(false);
  const [movieIDToSave, setMovieIDToSave] = useState("");

  const promptToMovies = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        process.env.REACT_APP_API_URL! + "/ai/prompt-to-movies",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setMovies(data.moviesList);
        dispatch({
          type: slicedStore.actions.setMoviesRedux,
          payload: data.moviesList,
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(String(error));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    // REMOVE THIS LINE & THE P ELEMENT THAT STARTS AT LINE 86 AFTER ENABLING THE FORM LATER
    alert("This future is currently disabled!");
    // promptToMovies();
  };

  useEffect(() => {
    document.title = "What ai Movie | Movie Advisor";
  }, []);

  // The following lines (76 -79) is unnecessary for production, it's just for developers to style the page
  // useEffect(() => {
  //   setMovies(sampleMoviesArray);
  // }, []);

  return (
    <>
      <NavCustom />
      <div id="movie-advisor-wrapper">
        <Container
          id="ai-section"
          className={
            movies.length !== 0 || moviesRedux.length !== 0 ? "moveUp" : ""
          }
        >
          <Row>
            <Col xs={12}>
              <p
                style={{
                  textAlign: "center",
                  margin: "0 0 1rem 1rem",
                  fontStyle: "italic",
                  fontSize: "1.15rem",
                  color: "#ff0",
                }}
              >
                The AI Search Tool is currently deactivated because of the token
                issue with Open AI, <br /> It'll be activated soon in the new
                version of the app!
              </p>
              <div className="prompt-wrapper">
                {prompt.length === 0 && (
                  <Typewriter
                    options={{
                      autoStart: true,
                      loop: true,
                    }}
                    onInit={(typewriter) => {
                      typewriter
                        .typeString("Describe your mood briefly!")
                        .pauseFor(3000)
                        .deleteAll()
                        .typeString("How do you feel?")
                        .pauseFor(3000)
                        .deleteAll()
                        .typeString("How do you want to feel?")
                        .pauseFor(3000)
                        .deleteAll()
                        .typeString("What you want to see?")
                        .pauseFor(3000)
                        .deleteAll()
                        .typeString("What are you passionate about?")
                        .pauseFor(3000)
                        .deleteAll()
                        .start();
                    }}
                  />
                )}
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="prompt"
                    onChange={(e) => {
                      setPrompt(e.target.value);
                    }}
                  />
                  <button type="submit" disabled={prompt.length === 0}>
                    <TbMoodSearch fill="#00000000" color="#fff" />
                  </button>
                </form>
              </div>
            </Col>
          </Row>
          <Row
            className="justify-content-center pb-3 pb-lg-0"
            xs={1}
            md={3}
            lg={5}
            style={{ rowGap: "1rem" }}
          >
            <WLModal
              showWLModal={showWLModal}
              setShowWLModal={setShowWLModal}
              movieID={movieIDToSave}
            />
            {isLoading && (
              <ThreeDots
                height="80"
                width="80"
                radius="8"
                color="#fefefe"
                wrapperClass="justify-content-center"
                wrapperStyle={{ marginTop: "10vh" }}
                visible={true}
              />
            )}
            {movies?.map(
              (movie) =>
                movie && (
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    setMovieIDToSave={setMovieIDToSave}
                    setShowWLModal={setShowWLModal}
                    saveable
                  />
                )
            )}
            {isLoading
              ? ""
              : movies.length === 0 &&
                moviesRedux.map(
                  (movie) =>
                    movie && (
                      <MovieCard
                        key={movie._id}
                        movie={movie}
                        setMovieIDToSave={setMovieIDToSave}
                        setShowWLModal={setShowWLModal}
                        saveable
                      />
                    )
                )}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default MovieAdvisor;
