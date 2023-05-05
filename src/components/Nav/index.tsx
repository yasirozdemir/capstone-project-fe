import { Container } from "react-bootstrap";
import "./style.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { toast } from "react-toastify";
import { alertOptions } from "../../tools";

const Nav = () => {
  const user = useAppSelector((st) => st.store.user);
  const [showNav, setShowNav] = useState(false);
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
      if (res.ok) {
        localStorage.removeItem("accessToken");
        navigate("/");
      } else {
        const data = await res.json();
        toast.error(data.message, alertOptions);
      }
    } catch (error) {}
  };

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
          <NavLink to="/discover">
            <img
              src={require("../../assets/images/logo-lg.png")}
              alt="logo"
              className="w-100"
            />
          </NavLink>
        </div>
        <div className="nav-links-container">
          <NavLink to="/discover" className="d-none d-lg-inline">
            Discover
          </NavLink>
          <NavLink to="/movies" className="d-none d-lg-inline">
            Movies
          </NavLink>
          {user._id !== "" && (
            <button className="d-none d-lg-inline" id="logout" onClick={logOut}>
              Log out
            </button>
          )}
          {user._id !== "" ? (
            <NavLink to="/user/me" id="navatar">
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
            <NavLink to="/" id="login">
              Login
            </NavLink>
          )}
        </div>
      </div>
      {showNav && (
        <div id="md-nav" className="pb-2">
          <NavLink to="/discover" className="mt-2">
            Discover
          </NavLink>
          <NavLink to="/movies">Movies</NavLink>
          {user._id !== "" && (
            <button id="logout" onClick={logOut}>
              Log out
            </button>
          )}
        </div>
      )}
    </Container>
  );
};

export default Nav;
