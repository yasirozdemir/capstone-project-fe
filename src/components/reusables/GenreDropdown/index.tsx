import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

interface Props {
  genres: string[];
  currentGenre: string;
}

const GenreDropdown = ({ genres, currentGenre }: Props) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleToggle = (isOpen: boolean) => {
    setShow(isOpen);
  };

  const handleGenreChange = (genre: string) => {
    setShow(false);
    navigate(`/movies?genres=${genre}`);
  };

  return (
    <>
      <Dropdown onToggle={handleToggle} id="genre-dropdown" alignRight>
        <Dropdown.Toggle variant="dark" className="d-flex">
          <span className="d-flex align-items-center justify-content-center">
            {currentGenre || "Genres"}
            {show ? (
              <BsChevronUp className="ml-2" />
            ) : (
              <BsChevronDown className="ml-2" />
            )}
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            as="button"
            onClick={() => {
              navigate("/movies");
            }}
          >
            All
          </Dropdown.Item>
          {genres.map((genre, i) => (
            <Dropdown.Item
              key={i}
              as="button"
              onClick={() => {
                handleGenreChange(genre);
              }}
            >
              {genre}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default GenreDropdown;
