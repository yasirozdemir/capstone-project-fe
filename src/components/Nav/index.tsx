import { Container } from "react-bootstrap";
import "./style.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setLoggedInUser } from "../../redux/actions";

const Nav = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((st) => st.store.user);
  // const observer = new IntersectionObserver((elements) => {
  //   elements.forEach((el) => {
  //     if (el.isIntersecting) {
  //       el.target.classList.add("show");
  //     }
  //   });
  // });

  // const mdNav: NodeListOf<Element> = document.querySelectorAll("#md-nav");
  // mdNav.forEach((el) => observer.observe(el));

  useEffect(() => {
    localStorage.setItem(
      "accessToken",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDUwZTAyOGU3YzRhNTYxOWJiODg4YjAiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTY4MzEwNDMxMCwiZXhwIjoxNjgzMTA3OTEwfQ.CWGrKkfoRWdfZdFSCoCMRiKmw0m1fgfguylGaDhLLPg"
    );
    dispatch(setLoggedInUser());
    // eslint-disable-next-line
  }, []);

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
          <Link to="/" className="d-none d-lg-inline">
            Login
          </Link>
          <button className="d-none d-lg-inline">Log out</button>
          <Link to="/user/me">
            <img
              src={
                user
                  ? user.avatar
                  : "https://res.cloudinary.com/yasirdev/image/upload/v1682762639/WhataMovie/users/avatars/user_default.jpg"
              }
              alt="user profile"
              className="w-100"
            />
          </Link>
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
