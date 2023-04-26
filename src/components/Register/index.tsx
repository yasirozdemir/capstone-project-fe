import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useState } from "react";
import { toast } from "react-toastify";
import { alertOptions } from "../../tools";

const Register = () => {
  const [showPW, setShowPW] = useState(false);

  const registerFunc = (e: any) => {
    e.preventDefault();
    toast.success("Your message has been sent!", alertOptions);
  };

  return (
    <Container fluid style={{ height: "100vh" }}>
      <Row className="justify-content-center align-items-center h-100">
        <Col xs={12} md={6}>
          <form
            onSubmit={registerFunc}
            className="login-form d-flex flex-column align-items-center "
          >
            <div className="logo-wrapper">
              <img
                src="https://res.cloudinary.com/yasirdev/image/upload/v1682517579/capstone/dev/harmonaize_oegw56.png"
                alt="logo"
                className="w-100"
              />
            </div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              autoComplete="false"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              autoComplete="false"
            />
            <div id="pw-wrapper">
              <input
                type={showPW ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                autoComplete="false"
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
            <button type="submit">LOGIN</button>
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
            <Link to="/register">Don't you have an account? Register now</Link>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
