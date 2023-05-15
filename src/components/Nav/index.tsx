import { Container, Navbar, Nav } from "react-bootstrap";
import "./style.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { toast } from "react-toastify";
import { alertOptions } from "../../tools";
import { useState } from "react";

const NavCustom = () => {
  const user = useAppSelector((st) => st.store.user);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };
      const URL = `${process.env.REACT_APP_API_URL}/users/session`;
      const res = await fetch(URL, options);
      collapseNav();
      if (res.ok) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("loggedInUserID");
        navigate("/");
      } else {
        const data = await res.json();
        toast.error(data.message, alertOptions);
      }
    } catch (error) {
      toast.error(String(error), alertOptions);
    }
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
            src={require("../../assets/images/logo-lg.png")}
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
                    : "https://res.cloudinary.com/yasirdev/image/upload/v1682762639/WhataMovie/users/avatars/user_default.jpg"
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
