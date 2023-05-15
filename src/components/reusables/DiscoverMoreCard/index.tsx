import { Col } from "react-bootstrap";
import { BiMovie } from "react-icons/bi";
import { Link } from "react-router-dom";

const DiscoverMoreCard = () => {
  return (
    <Col className="d-flex justify-content-center mb-3">
      <div className="movie-card" style={{ maxWidth: "300px" }}>
        <div className="movie-card-body">
          <Link
            to={"/movie-advisor"}
            style={{ fontSize: "1.2rem" }}
            className="d-flex flex-column justify-content-center align-items-center w-100"
          >
            <img
              src="https://images.pexels.com/photos/7991229/pexels-photo-7991229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="movie cover"
              className="img-fluid"
            />
            <div className="d-flex flex-column justify-content-center align-items-center discover-overlay">
              <BiMovie style={{ fontSize: "4rem" }} />
              <span>DISCOVER</span>
              <span>MORE</span>
            </div>
          </Link>
        </div>
      </div>
    </Col>
  );
};

export default DiscoverMoreCard;
