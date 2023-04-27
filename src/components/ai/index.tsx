import { useEffect, useState } from "react";
import { IMovie } from "../../interfaces/IMovie";
import "./style.css";
import { Col, Container, Row } from "react-bootstrap";
import Typewriter from "typewriter-effect";
import { RiMovie2Fill } from "react-icons/ri";
import MovieCard from "../reusables/MovieCard";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";

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
      if (res.ok) {
        const data = await res.json();
        setMovies(data.moviesList);
      } else {
        setError({ is: true, message: "Something went wrong 😥" });
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
    // promptToMovies();
    setMovies([]);
  };

  useEffect(() => {
    setMovies([
      {
        id: "tt0120689",
        name: "The Green Mile",
        year: 1999,
        type: "feature",
        image: {
          src: "https://m.media-amazon.com/images/M/MV5BMTUxMzQyNjA5MF5BMl5BanBnXkFtZTYwOTU2NTY3._V1_.jpg",
          width: 500,
          height: 740,
        },
        starring: "Tom Hanks, Michael Clarke Duncan",
        similarity: 1,
      },
      {
        id: "tt0108052",
        name: "Schindler's List",
        year: 1993,
        type: "feature",
        image: {
          src: "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
          width: 1600,
          height: 2400,
        },
        starring: "Liam Neeson, Ralph Fiennes",
        similarity: 1,
      },
      {
        id: "tt0111161",
        name: "The Shawshank Redemption",
        year: 1994,
        type: "feature",
        image: {
          src: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
          width: 1200,
          height: 1800,
        },
        starring: "Tim Robbins, Morgan Freeman",
        similarity: 1,
      },
      {
        id: "tt0109830",
        name: "Forrest Gump",
        year: 1994,
        type: "feature",
        image: {
          src: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
          width: 558,
          height: 809,
        },
        starring: "Tom Hanks, Robin Wright",
        similarity: 1,
      },
      {
        id: "tt0454921",
        name: "The Pursuit of Happyness",
        year: 2006,
        type: "feature",
        image: {
          src: "https://m.media-amazon.com/images/M/MV5BMTQ5NjQ0NDI3NF5BMl5BanBnXkFtZTcwNDI0MjEzMw@@._V1_.jpg",
          width: 1378,
          height: 2048,
        },
        starring: "Will Smith, Thandiwe Newton",
        similarity: 1,
      },
    ]);
  }, []);

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
      <Row>
        {isLoading && (
          <ThreeDots
            height="80"
            width="80"
            radius="8"
            color="#fefefe"
            wrapperClass="mx-auto"
            visible={true}
          />
        )}
        {movies?.map(
          (movie) =>
            movie && (
              <Col key={movie.id}>
                <MovieCard movie={movie} />
              </Col>
            )
        )}
      </Row>
    </Container>
  );
};

export default AI;
