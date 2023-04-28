import "./style.css";
import { ChangeEventHandler } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useState } from "react";
import { toast } from "react-toastify";
import { alertOptions } from "../../tools";
import PropTyes from "prop-types";

const LoginRegister = ({ isLogin }: props) => {
  const [showPW, setShowPW] = useState(false);
  const [formData, setFormData] = useState({});

  const updateFormData: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const loginFunc = () => {
    toast.success("Login!", alertOptions);
    console.log(formData);
  };

  const registerFunc = () => {
    toast.success("Register!", alertOptions);
    console.log(formData);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) loginFunc();
    else registerFunc();
  };

  return (
    <Container fluid style={{ height: "100vh" }}>
      <Row className="justify-content-center align-items-center h-100">
        <Col xs={12} md={6}>
          <form
            onSubmit={handleSubmit}
            id="login-register-form"
            className=" d-flex flex-column align-items-center "
          >
            <div className="logo-wrapper">
              <img
                src={require("../../assets/images/logo-lg.png")}
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
            <button type="submit">{isLogin ? "LOGIN" : "REGISTER"}</button>
            <div id="or-line">
              <small>OR</small>
            </div>
            <a
              href="#/"
              className="d-flex justify-content-center align-items-center"
            >
              <img
                src={require("../../assets/images/google.png")}
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

LoginRegister.propTypes = {
  isLogin: PropTyes.bool,
};

LoginRegister.defaultProps = {
  isLogin: true,
};

export default LoginRegister;
