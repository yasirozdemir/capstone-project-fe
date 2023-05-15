import "./style.css";
import { ChangeEventHandler, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useState } from "react";
import { toast } from "react-toastify";
import { alertOptions } from "../../../tools";
import { useAppDispatch } from "../../../redux/hooks";
import { slicedStore } from "../../../redux/slices";

const LoginRegister = ({ isLogin }: props) => {
  const [showPW, setShowPW] = useState(false);
  const [formData, setFormData] = useState({});
  const [isError, setError] = useState({ is: false, message: "" });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const updateFormData: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const loginOrRegisterFunc = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      let URL = `${process.env.REACT_APP_API_URL}/users`;
      if (isLogin) URL += "/session";
      const res = await fetch(URL, options);
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        navigate("/movie-advisor");
        dispatch({
          type: slicedStore.actions.setUser,
          payload: data.user,
        });
      } else {
        setError({ is: true, message: data.message });
        toast.error(isError.message, alertOptions);
      }
    } catch (error) {
      setError({ is: true, message: String(error) });
      toast.error(isError.message, alertOptions);
    }
  };

  useEffect(() => {
    document.title = `What a Movie | ${isLogin ? "Login" : "Register"}`;
  }, [isLogin]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginOrRegisterFunc();
  };

  return (
    <Container fluid style={{ height: "100vh" }} id="log-reg">
      <Row
        className="justify-content-center align-items-center h-100"
        style={{ backdropFilter: "blur(5px)" }}
      >
        <Col xs={12} md={6}>
          <form
            onSubmit={handleSubmit}
            id="login-register-form"
            className=" d-flex flex-column align-items-center "
          >
            <div className="logo-wrapper">
              <img
                src={require("../../../assets/images/logo-lg.png")}
                alt="logo"
                className="w-100"
              />
            </div>
            {!isLogin && (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  autoComplete="false"
                  required
                  onChange={updateFormData}
                />
                <input
                  type="text"
                  name="surname"
                  placeholder="Surname"
                  autoComplete="false"
                  required
                  onChange={updateFormData}
                />
              </>
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="false"
              required
              onChange={updateFormData}
            />
            <div id="pw-wrapper">
              <input
                type={showPW ? "text" : "password"}
                name="password"
                placeholder="Password"
                autoComplete="false"
                required
                onChange={updateFormData}
              />
              <button
                type="button"
                onClick={() => {
                  setShowPW(!showPW);
                }}
              >
                {showPW ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
              </button>
            </div>
            <button type="submit">{isLogin ? "Login" : "Register"}</button>
            <div id="or-line">
              <small>OR</small>
            </div>
            <a
              href={`${process.env.REACT_APP_API_URL}/users/googleLogin`}
              className="d-flex justify-content-center align-items-center"
            >
              <img
                src={require("../../../assets/images/google.png")}
                style={{ width: "20px" }}
                alt="google"
                className="mr-2"
              />
              Continue with Google
            </a>
            {isLogin ? (
              <Link to="/register">
                Don't you have an account? Register now!
              </Link>
            ) : (
              <Link to="/">Already have an account? Go to Login Page!</Link>
            )}
          </form>
        </Col>
      </Row>
    </Container>
  );
};

interface props {
  isLogin: boolean;
}

LoginRegister.defaultProps = {
  isLogin: true,
};

export default LoginRegister;
