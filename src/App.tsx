import React from "react";
import AI from "./components/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginRegister from "./components/Login";
import Verified from "./components/Verified";
import Nav from "./components/Nav";
import UserProfile from "./components/UserProfile";

function App() {
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
        <Nav />
        <Routes>
          <Route path="/" element={<LoginRegister />} />
          <Route path="/register" element={<LoginRegister isLogin={false} />} />
          <Route path="/ai" element={<AI />} />
          <Route path="/verified" element={<Verified />} />
          <Route path="/user/:userID" element={<UserProfile />} />
          <Route
            path="*"
            element={
              <h1 className="text-center text-white mt-5">
                404 Page Not Found :(
              </h1>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
