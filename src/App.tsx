import React from "react";
import AI from "./components/pages/Discover";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginRegister from "./components/pages/Login";
import Verified from "./components/non-functionals/Verified";
import Nav from "./components/Nav";
import UserProfile from "./components/pages/UserProfile";
import GoogleRedirect from "./components/non-functionals/GoogleRedirect";
import { useAppDispatch } from "./redux/hooks";
import { setLoggedInUser } from "./redux/actions";
import { useEffect } from "react";
import MoviePage from "./components/pages/MoviePage";
import WatchlistPage from "./components/pages/WatchlistPage";
import MoviesPage from "./components/pages/Movies";

function App() {
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) dispatch(setLoggedInUser());
    // eslint-disable-next-line
  }, [accessToken]);

  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginRegister />} />
          <Route path="/register" element={<LoginRegister isLogin={false} />} />
          <Route
            path="/discover"
            element={
              <>
                <Nav />
                <AI />
              </>
            }
          />
          <Route
            path="/user/:userID"
            element={
              <>
                <Nav />
                <UserProfile />
              </>
            }
          />
          <Route
            path="/movie/:movieID"
            element={
              <>
                <Nav />
                <MoviePage />
              </>
            }
          />
          <Route
            path="/watchlist/:watchlistID"
            element={
              <>
                <Nav />
                <WatchlistPage />
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <>
                <Nav />
                <MoviesPage />
              </>
            }
          />
          <Route path="/verified" element={<Verified />} />
          <Route path="/googleRedirect" element={<GoogleRedirect />} />
          <Route
            path="*"
            element={
              <h1 className="text-center text-white topnav-fix">
                404 Page Not Found!
              </h1>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
