import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";

export const Login = ({ author, setAuthor }) => {
  return (
    <Container className="d-flex align-items-center" style={{ height: "45vh" }}>
      <Container
        className="my-4 p-1 bg-light text-center"
        style={{ borderRadius: "10px", alignItems: "center" }}
      >
        <Row>
          <Col>
            <Form>
              <Form.Group className="mb-3">
                <h1 className="p-5">Welcome!</h1>
                <h4>Please select a User: </h4>
                <Form.Select
                  className="w-50 m-auto"
                  value={author}
                  onChange={(e) => {
                    setAuthor(e.target.value);
                  }}
                >
                  <option value="tickle122">tickle122</option>
                  <option value="grumpy19">grumpy19</option>
                  <option value="happyamy2016">happyamy2016</option>
                  <option value="cooljmessy">cooljmessy</option>
                  <option value="weegembump">weegembump</option>
                  <option value="jessjelly">jessjelly</option>
                </Form.Select>
              </Form.Group>
              <Link to="/reviews">
                <Button className="m-3" variant="primary" type="button">
                  Login
                </Button>
              </Link>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
