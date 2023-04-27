import { useEffect, useState } from "react";
import { IMovie } from "../../interfaces/IMovie";

const AI = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [prompt, setPrompt] = useState("");

  const propmtToMovies = async () => {
    try {
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
        console.log(data.moviesList);
      } else {
        console.error("err");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    propmtToMovies();
    setMovies([]);
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="prompt"
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
      {movies?.map((movie: IMovie) =>
        movie ? (
          <div key={movie.id}>
            <img src={movie.image?.src} alt="song" />
            <h3>{movie.name}</h3>
          </div>
        ) : null
      )}
    </div>
  );
};

export default AI;
