import { useEffect, useState } from "react";
import { getComments, deleteComment } from "../api/api";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export const Comments = ({
  author,
  review_id,
  commentCount,
  setCommentCount,
  reviewComments,
  setReviewComments,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [page, setPage] = useState(1);
  const maxPage = Math.ceil(commentCount / 10);

  useEffect(() => {
    setIsLoading(true);
    getComments(review_id, page).then((comments) => {
      setReviewComments(comments);
      setIsLoading(false);
    });
  }, [review_id, setReviewComments, page]);

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

  if (isLoading) {
    return (
      <Container className="">
        <Container className="mx-5 p-5">
          <Spinner animation="border" variant="dark" className="m-5 p-4" />
        </Container>
      </Container>
    );
  }

  const handleDelete = (id) => {
    setIsPending(true);
    deleteComment(id).then(() => {
      setReviewComments((currReviewComments) => {
        const index = currReviewComments.findIndex(
          (comment) => comment.comment_id === id
        );
        const newComments = [...currReviewComments];
        newComments.splice(index, 1);
        return newComments;
      });
      setCommentCount((currCommentCount) => {
        return currCommentCount - 1;
      });
      setIsPending(false);
    });
  };

  return (
    <div className="comments-container">
      <h3 className="text-center">{commentCount} comments:</h3>
      <Container>
        {reviewComments.map((comment) => {
          return (
            <Card className="my-1" key={comment.comment_id}>
              <p className="text-muted">by {comment.author}</p>
              <p>{comment.body}</p>
              <p className="text-muted">
                Comment made on: {new Date(comment.created_at).toDateString()}
              </p>
              <div className="text-end">
                {author === comment.author && !isPending && (
                  <Button
                    type="button"
                    onClick={() => {
                      handleDelete(comment.comment_id);
                    }}
                  >
                    Delete
                  </Button>
                )}
                {isPending && (
                  <Button type="button" disabled>
                    Deleting...
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </Container>
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
    </div>
  );
};
