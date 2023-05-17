import React from "react";
import MovieAdvisor from "./components/pages/MovieAdvisor";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginRegister from "./components/pages/Login";
import Verified from "./components/non-functionals/Verified";
import UserProfile from "./components/pages/UserProfile";
import GoogleRedirect from "./components/non-functionals/GoogleRedirect";
import { useAppDispatch } from "./redux/hooks";
import { setLoggedInUser } from "./redux/actions";
import { useEffect, useState } from "react";
import MoviePage from "./components/pages/MoviePage";
import WatchlistPage from "./components/pages/WatchlistPage";
import MoviesPage from "./components/pages/Movies";
import { Loc } from "./tools";

function App() {
  const dispatch = useAppDispatch();
  const [loc, setLoc] = useState<string | null>(null);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken && loc !== "/" && loc !== "/register")
      dispatch(setLoggedInUser());
    // eslint-disable-next-line
  }, [accessToken, loc]);

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
        <Loc setLoc={setLoc} />
        <Routes>
          <Route path="/" element={<LoginRegister />} />
          <Route path="/register" element={<LoginRegister isLogin={false} />} />
          <Route path="/movie-advisor" element={<MovieAdvisor />} />
          <Route path="/user/:userID" element={<UserProfile />} />
          <Route path="/movie/:movieID" element={<MoviePage />} />
          <Route path="/watchlist/:watchlistID" element={<WatchlistPage />} />
          <Route path="/movies" element={<MoviesPage />} />
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
