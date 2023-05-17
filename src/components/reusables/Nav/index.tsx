import { Container, Navbar, Nav } from "react-bootstrap";
import "./style.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useState } from "react";
import { slicedStore } from "../../../redux/slices";

const NavCustom = () => {
  const user = useAppSelector((st) => st.store.user);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logOut = () => {
    collapseNav();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("loggedInUserID");
    dispatch({ type: slicedStore.actions.setUser, payload: [] });
    navigate("/");
  };

  const collapseNav = () => {
    setIsExpanded(false);
  };

  return (
    <Container fluid>
      <Navbar id="nav" expand="lg" fixed="top" expanded={isExpanded}>
        <NavLink
          to="/movie-advisor"
          className="navbar-brand"
          onClick={collapseNav}
        >
          <img
            src={require("../../../assets/images/logo-lg.png")}
            alt="logo"
            className="w-100"
          />
        </NavLink>
        <Nav className="flex-row user-related">
          {user._id !== "" ? (
            <NavLink
              to="/user/me"
              id="navatar"
              onClick={collapseNav}
              className="ml-0 ml-lg-2"
            >
              <img
                src={
                  user.avatar
                    ? user.avatar
                    : "https://res.cloudinary.com/yasirdev/image/upload/v1684314041/WhataMovie/users/avatars/user_default.jpg"
                }
                alt="user profile"
                className="w-100"
              />
            </NavLink>
          ) : (
            <NavLink
              to="/"
              id="login"
              className="nav-link"
              onClick={collapseNav}
            >
              Login
            </NavLink>
          )}
        </Nav>
        <Navbar.Toggle
          aria-controls="custom-nav"
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          <span className="icon-line"></span>
          <span className="icon-line"></span>
          <span className="icon-line"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="custom-nav">
          <Nav className="ml-auto" style={{ gap: "0.5rem" }}>
            <NavLink
              to="/movie-advisor"
              className="nav-link"
              onClick={collapseNav}
              id="movie-advisor-btn"
            >
              Movie Advisor
            </NavLink>
            <NavLink to="/movies" className="nav-link" onClick={collapseNav}>
              Movies
            </NavLink>
            {user._id !== "" && (
              <button className="nav-link" id="logout" onClick={logOut}>
                Log out
              </button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default NavCustom;
