import "./style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import { useEffect } from "react";
import { MutatingDots } from "react-loader-spinner";

const GoogleRedirect = () => {
  const loc = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(loc.search);
    const accessToken = searchParams.get("accessToken");
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      navigate("/discover");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Container style={{ height: "100vh" }}>
      <Row className="h-100 justify-content-center align-items-center px-3 px-md-0">
        <Col xs={12} md={6} id="google-redirect-card">
          <MutatingDots
            height="100"
            width="100"
            color="var(--logo-color)"
            secondaryColor="var(--logo-color)"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass="d-flex align-items-center justify-content-center"
            visible={true}
          />
          <div>
            <p className="m-0">You've successfully logged in, </p>
            <p className="m-0">redirecting you to the app!</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default GoogleRedirect;
