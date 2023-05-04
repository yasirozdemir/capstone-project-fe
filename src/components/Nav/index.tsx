import { Container } from "react-bootstrap";
import "./style.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";

const Nav = () => {
  const user = useAppSelector((st) => st.store.user);
  const [showNav, setShowNav] = useState(false);

  return (
    <Container fluid className="sticky-top" id="nav">
      <div>
        <div className="d-flex d-md-none h-100">
          <button
            id="navbar-controller"
            className={showNav ? "collapsed" : ""}
            onClick={() => {
              setShowNav(!showNav);
            }}
          >
            <span className="icon-line"></span>
            <span className="icon-line"></span>
            <span className="icon-line"></span>
          </button>
        </div>
        <div style={{ width: "8rem" }}>
          <Link to="/discover">
            <img
              src={require("../../assets/images/logo-lg.png")}
              alt="logo"
              className="w-100"
            />
          </Link>
        </div>
        <div className="nav-links-container">
          <Link to="/ai" className="d-none d-lg-inline">
            Discover
          </Link>
          <Link to="/ai" className="d-none d-lg-inline">
            Movies
          </Link>
          {user._id === "" ? (
            <Link to="/" className="d-none d-lg-inline" id="login">
              Login
            </Link>
          ) : (
            <button className="d-none d-lg-inline" id="logout">
              Log out
            </button>
          )}
          {user._id && (
            <Link to="/user/me" id="navatar">
              <img
                src={
                  user.avatar
                    ? user.avatar
                    : "https://res.cloudinary.com/yasirdev/image/upload/v1682762639/WhataMovie/users/avatars/user_default.jpg"
                }
                alt="user profile"
                className="w-100"
              />
            </Link>
          )}
        </div>
      </div>
      {showNav && (
        <div id="md-nav">
          <Link to="/ai" className="mt-2">
            Discover
          </Link>
          <Link to="/movies">Movies</Link>
          <Link to="/">Login</Link>
          <button>Log out</button>
        </div>
      )}
    </Container>
  );
};

export default Nav;
