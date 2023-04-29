import { useState } from "react";
import { IMovie } from "../../interfaces/IMovie";
import "./style.css";
import { Col, Container, Row } from "react-bootstrap";
import Typewriter from "typewriter-effect";
import { RiMovie2Fill } from "react-icons/ri";
import MovieCard from "../reusables/MovieCard";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";

// The following imports are unnecessary for production, it's just for developers to style the page
// import { sampleMoviesArray } from "../../assets/sampleMovies";
// import { useEffect } from "react";

const AI = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState({ is: false, message: "" });

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
      } else {
        setError({ is: true, message: data.message });
        toast.error(isError.message);
      }
    } catch (error) {
      setError({ is: true, message: String(error) });
      toast.error(isError.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    promptToMovies();
    setMovies([]);
  };

  // The following useEffect is unnecessary for production, it's just for developers to style the page
  // useEffect(() => {
  //   setMovies(sampleMoviesArray);
  // }, []);

  return (
    <Container id="ai-section">
      <Row className={movies.length !== 0 ? "moveUp" : ""}>
        <Col>
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
                <RiMovie2Fill />
              </button>
            </form>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center" xs={2} md={3} lg={5}>
        {isLoading && (
          <ThreeDots
            height="80"
            width="80"
            radius="8"
            color="#fefefe"
            wrapperStyle={{ marginTop: "10vh" }}
            visible={true}
          />
        )}
        {movies?.map(
          (movie) => movie && <MovieCard key={movie._id} movie={movie} />
        )}
      </Row>
    </Container>
  );
};

export default AI;
