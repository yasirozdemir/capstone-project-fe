import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import {
  BsChevronDown,
  BsChevronUp,
  BsSortAlphaDown,
  BsSortAlphaDownAlt,
} from "react-icons/bs";
import {
  TbSortAscendingNumbers,
  TbSortDescendingNumbers,
} from "react-icons/tb";
import "../GenreDropdown/style.css";

interface Props {
  sort: {
    criteria: string | null;
    order: string;
  };
  setSort: Function;
}

const SortDropdown = ({ sort, setSort }: Props) => {
  const [show, setShow] = useState(false);
  const [icon, setIcon] = useState<JSX.Element | undefined>();

  const handleToggle = (isOpen: boolean) => {
    setShow(isOpen);
  };

  const handleSortChange = (
    criteria: string,
    order: string,
    icon: JSX.Element
  ) => {
    setSort({ criteria, order });
    setIcon(icon);
  };

  return (
    <>
      <Dropdown onToggle={handleToggle} id="sort-dropdown" alignRight>
        <Dropdown.Toggle variant="dark" className="d-flex">
          <span className="d-flex align-items-center justify-content-center">
            Sort by {icon}
            {show ? (
              <BsChevronUp className="ml-2" />
            ) : (
              <BsChevronDown className="ml-2" />
            )}
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            className="d-flex align-items-center"
            as="button"
            onClick={() => {
              handleSortChange(
                "title",
                "+",
                <BsSortAlphaDown
                  className="ml-1"
                  style={{ fontSize: "1.3rem" }}
                />
              );
            }}
          >
            Title <BsSortAlphaDown className="ml-1" />
          </Dropdown.Item>
          <Dropdown.Item
            className="d-flex align-items-center"
            as="button"
            onClick={() => {
              handleSortChange(
                "title",
                "-",
                <BsSortAlphaDownAlt
                  className="ml-1"
                  style={{ fontSize: "1.3rem" }}
                />
              );
            }}
          >
            Title <BsSortAlphaDownAlt className="ml-1" />
          </Dropdown.Item>
          <Dropdown.Item
            className="d-flex align-items-center"
            as="button"
            onClick={() => {
              handleSortChange(
                "imdbRating",
                "-",
                <TbSortDescendingNumbers
                  className="ml-1"
                  style={{ fontSize: "1.3rem" }}
                />
              );
            }}
          >
            IMDB Rating <TbSortDescendingNumbers className="ml-1" />
          </Dropdown.Item>
          <Dropdown.Item
            className="d-flex align-items-center"
            as="button"
            onClick={() => {
              handleSortChange(
                "imdbRating",
                "+",
                <TbSortAscendingNumbers
                  className="ml-1"
                  style={{ fontSize: "1.3rem" }}
                />
              );
            }}
          >
            IMDB Rating <TbSortAscendingNumbers className="ml-1" />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default SortDropdown;
