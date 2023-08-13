import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReviews } from "../api/api";

export const Reviews = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [reviews, setReviews] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [err, setErr] = useState("");

  const sortByQuery = searchParams.get("sort_by") || undefined;
  const orderByQuery = searchParams.get("order") || undefined;

  useEffect(() => {
    setIsLoading(true);
    getReviews(page, category, sortByQuery, orderByQuery)
      .then((data) => {
        setReviews(data.reviews);
        setTotalCount(data.total_count);
        setMaxPage(Math.ceil(data.total_count / 10));
        setIsLoading(false);
      })
      .catch((err) => {
        setErr(err.response.data.msg);
        setIsLoading(false);
      });
  }, [page, category, sortByQuery, orderByQuery]);

  if (err) {
    return <h2>{err}</h2>;
  }

  if (isLoading) {
    return (
      <Container className="">
        <Container className="mx-5 p-5">
          <Spinner animation="border" variant="light" className="m-5 p-4" />;
        </Container>
      </Container>
    );
  }

  const handleNext = () => {
    setPage((currPage) => {
      return currPage + 1;
    });
  };

  const handlePrev = () => {
    setPage((currPage) => {
      return currPage - 1;
    });
  };

  return (
    <div>
      <Navbar bg="light" className="d-flex flex-wrap">
        <Container>
          <Navbar.Collapse>
            <Nav>
              <Link to="/" className="link">
                back to login
              </Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-center gap-1">
            sort by:
            <Nav>
              <Form.Select
                value={sortByQuery}
                onChange={(e) => {
                  const newSearchParams = new URLSearchParams(searchParams);
                  newSearchParams.set("sort_by", e.target.value);
                  setSearchParams(newSearchParams);
                }}
              >
                <option value="created_at">date</option>
                <option value="comment_count">number of comments</option>
                <option value="votes">votes</option>
              </Form.Select>
            </Nav>
            <Nav className="mx-1 gap-1">
              <Form.Check
                id="asc"
                type="radio"
                name="asc-desc"
                value={orderByQuery}
                onChange={(e) => {
                  const newSearchParams = new URLSearchParams(searchParams);
                  newSearchParams.set("order", "asc");
                  setSearchParams(newSearchParams);
                }}
                checked={orderByQuery === "asc"}
              ></Form.Check>
              <label htmlFor="asc">asc</label>
              <Form.Check
                id="desc"
                type="radio"
                name="asc-desc"
                value={orderByQuery}
                onChange={(e) => {
                  const newSearchParams = new URLSearchParams(searchParams);
                  newSearchParams.set("order", "desc");
                  setSearchParams(newSearchParams);
                }}
                checked={orderByQuery === "desc" || !orderByQuery}
              ></Form.Check>
              <label htmlFor="desc">desc</label>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Link to="/categories" className="link">
                Categories
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container
        id="all-reviews-container"
        className="bg-light my-1 text-center ct"
      >
        <h2 className="text-dark text-center">
          Here are all the {totalCount} Reviews
          {category ? ` categorised by ${category}` : ""}:
        </h2>
        {category ? (
          <Link to="/reviews">
            <Button type="button"> back to all Reviews</Button>
          </Link>
        ) : null}
        <div>
          {reviews.map((review) => {
            return (
              <Card className="mb-4" key={review.review_id}>
                <Row className="row g-1">
                  <Col className="col-md-7">
                    <Link className="link" to={`/reviews/${review.review_id}`}>
                      <Card.Img
                        className="img-fluid rounded-start"
                        src={review.review_img_url}
                        alt={review.title}
                      />
                    </Link>
                  </Col>
                  <Col>
                    <Link className="link" to={`/reviews/${review.review_id}`}>
                      <Card.Body>
                        <Card.Title>{review.title}</Card.Title>
                        <Card.Subtitle className="mb-3 text-muted">
                          by {review.owner}
                        </Card.Subtitle>
                        <p>category: {review.category}</p>
                        <p>votes: {review.votes}</p>
                        <p>comment count: {review.comment_count}</p>
                      </Card.Body>
                    </Link>
                  </Col>
                </Row>
              </Card>
            );
          })}
        </div>
        <div className="pagination justify-content-center">
          {page === 1 ? (
            <></>
          ) : (
            <Button type="button" className="m-2" onClick={handlePrev}>
              prev
            </Button>
          )}
          {page === maxPage ? (
            <></>
          ) : (
            <Button type="button" className="m-2" onClick={handleNext}>
              next
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
};
