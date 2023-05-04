import { Link, useLocation } from "react-router-dom";
import "./style.css";
import { Container, Col, Row } from "react-bootstrap";
import { RiErrorWarningFill, RiCheckboxCircleFill } from "react-icons/ri";
import { useEffect, useState } from "react";

const Verified = () => {
  const loc = useLocation();
  const query = new URLSearchParams(loc.search);
  const [u, setU] = useState(true);
  const [v, setV] = useState(true);

  useEffect(() => {
    setU(query.get("u") === "true");
    setV(query.get("v") === "true");
    // eslint-disable-next-line
  }, []);

  return (
    <Container style={{ height: "100vh" }}>
      <Row className="h-100 justify-content-center align-items-center px-3 px-md-0">
        <Col xs={12} md={6} id="verified-card">
          <span className="mb-3">
            {v ? (
              <RiCheckboxCircleFill fill="green" />
            ) : (
              <RiErrorWarningFill fill="var(--logo-color)" />
            )}
          </span>
          {u ? (
            <h3>User verified successfully!</h3>
          ) : (
            <h3>Something went wrong!</h3>
          )}
          <Link to="/">Go to login page</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Verified;
