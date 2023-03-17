import react from "react";
import {Button, Card} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ReviewCard({ review, formatDate }) {
  return (
    <Card style={{ width: "25rem", padding: "2em" }}>
      <Card.Img
        variant="top"
        src={review.review_img_url}
        alt={review.review_id}
      />
      <Card.Body>
        <Card.Title>{review.title}</Card.Title>
        {/* <Card.Text>{review.review_body}</Card.Text> */}
        <Card.Text>Author: {review.owner}</Card.Text>
        <Card.Text>Votes: {review.votes}</Card.Text>
        <Link to={`/reviews/${review.review_id}`}>
          <Button variant="primary">More Details</Button>
        </Link>
      </Card.Body>
      <Card.Footer className="text-muted">{formatDate}</Card.Footer>
    </Card>
  );
}