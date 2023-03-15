import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCommentsOfReview, getSingleReview, patchVotes } from "../api";
import PostComment from "./PostComment";

export const ReviewById = () => {
  const { review_id } = useParams();
  const [review, setReview] = useState({});
  const [comments, setComments] = useState([]);
  const [votes, setVotes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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
  }, []);

  const upVote = () => {
    setVotes((currVotes) => currVotes + 1);
    patchVotes(review_id).catch((err) => {
      if (err) {
        setVotes((currVotes) => currVotes - 1);
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
  //   const formattedDate = new Date(review.created_at).toLocaleString("en-US", {
  //     month: "short",
  //     day: "2-digit",
  //     year: "numeric",
  //   });
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
            <button type="button" onClick={upVote}>
              +
            </button>
          </span>
          <p>{formatDateFunc(review.created_at)}</p>
        </div>
        <div id="comments-container">
          <h3>Comments</h3>
          <PostComment addComment={addComment} review_id={review_id} />
          {comments.map((comment) => {
            console.log(comment)
            return (
              <div className="comment-box" key={comment.comment_id}>
                <p>{comment.body}</p>
                <p>{formatDateFunc(comment.created_at)}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};
