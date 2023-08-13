import { useState } from "react";
import { postComments } from "../api/api";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const NewComment = ({
  author,
  review_id,
  setReviewComments,
  setCommentCount,
}) => {
  const [text, setText] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleText = (event) => {
    setText(event.target.value);
  };

  const handlePostBtn = () => {
    const commentObj = { username: author, body: text };
    setIsPending(true);
    if (text) {
      postComments(review_id, commentObj).then((comment) => {
        setText("");
        setReviewComments((currReviewComments) => {
          return [comment, ...currReviewComments];
        });
        setCommentCount((currCommentCount) => {
          return currCommentCount + 1;
        });
        setIsPending(false);
      });
    } else {
      setIsPending(false);
    }
  };

  return (
    <Form className="">
      <Form.Control
        className="m-1"
        as="textarea"
        rows={3}
        name="comment"
        id="comment"
        placeholder="Add a new comment..."
        value={text}
        onChange={handleText}
      />
      {!isPending && (
        <Button className="m-1" type="button" onClick={handlePostBtn}>
          Post
        </Button>
      )}
      {isPending && (
        <Button className="m-1" type="button" disabled>
          Posting...
        </Button>
      )}
    </Form>
  );
};
