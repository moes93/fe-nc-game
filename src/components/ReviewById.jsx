import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  getCommentsOfReview,
  getSingleReview,
  patchVotes,
  patchVotesMinus,
} from "../api";
import PostComment from "./PostComment";
import { UserContext } from "../contexts/LoggedInUserContext";

export const ReviewById = () => {
  const { review_id } = useParams();
  const [review, setReview] = useState({});
  const [comments, setComments] = useState([]);
  const [votes, setVotes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);
  const userValueFromContext = useContext(UserContext);

  useEffect(() => {
    getSingleReview(review_id).then((review) => {
      setIsLoading(false);

      setReview(review);
      setVotes(review.votes);
    });
  }, [review_id]);

  useEffect(() => {
    getCommentsOfReview(review_id).then((data) => {
      if (data.comments.length > 0) {
        setComments(data.comments);
      } else setComments([]);
    });
  }, [comments]);

  const upVote = () => {
    if (!hasVoted) {
      setHasVoted(true);
      setVotes((currVotes) => currVotes + 1);
      patchVotes(review_id).catch((err) => {
        if (err) {
          setVotes((currVotes) => currVotes - 1);
        }
      });
    }
  };
  const downVote = () => {
    setHasVoted(false);
    setVotes((currVotes) => currVotes - 1);
    patchVotesMinus(review_id).catch((err) => {
      if (err) {
        setVotes((currVotes) => currVotes + 1);
      }
    });
  };

  const addComment = (newComment) => {
    setComments([newComment, ...comments]);
  };

  const formatDateFunc = (date) => {
    const format = new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    return format;
  };

  if (isLoading) {
    return <h3>Loading content...</h3>;
  } else {
    return (
      <div id="review-pg-container">
        <div id="review-container">
          <h1>{review.title}</h1>
          <img src={review.review_img_url} alt={review.title} />
          <p>{review.review_body}</p>
          <p>By {review.owner}</p>
          <span>
            <p>Votes: {votes}</p>
            {!hasVoted ? (
              <button type="button" onClick={upVote}>
                +
              </button>
            ) : (
              <button type="button" onClick={downVote}>
                -
              </button>
            )}
          </span>
          <p>{formatDateFunc(review.created_at)}</p>
        </div>
        <div id="comments-container">
          <h3>Comments</h3>
          <PostComment addComment={addComment} review_id={review_id} />
          {comments.length > 0 ? (comments.map((comment) => {
            return (
              <div className="comment-box" key={comment.comment_id}>
                <p>{comment.body}</p>
                <p>{formatDateFunc(comment.created_at)}</p>
                <p>{comment.author}</p>
                <p>{comment.votes}</p>
              </div>
            );
          })):(<p>no comments avalible</p>)}
          {}
        </div>
      </div>
    );
  }
};
