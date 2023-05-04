import { Container } from "react-bootstrap";
import "./style.css";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setLoggedInUser } from "../../redux/actions";

const Nav = () => {
  const dispatch = useAppDispatch();
  const loc = useLocation();
  const navPaths = ["discover", "user", "watchlist"];
  const render = navPaths.some((path) => loc.pathname.includes(path));
  const user = useAppSelector((st) => st.store.user);

  useEffect(() => {
    dispatch(setLoggedInUser());
    // eslint-disable-next-line
  }, []);

  const [showNav, setShowNav] = useState(false);
  if (render) {
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
            <Link to="/ai">
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
  } else return <></>;
};

export default Nav;
