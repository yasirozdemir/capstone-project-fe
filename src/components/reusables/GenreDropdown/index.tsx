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

  return (
    <>
      <Dropdown onToggle={handleToggle}>
        <Dropdown.Toggle variant="dark" id="dropdownButton" className="d-flex">
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
          {genres.map((genre, i) => (
            <Dropdown.Item
              key={i}
              as="button"
              onClick={(e) => {
                e.preventDefault();
                setShow(false);
                navigate(`/movies?genres=${genre}`);
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
