import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReviews } from "../api";

export default function GetReviews() {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // setIsLoading(true);
    getReviews().then((allReviews) => {
      setReviews(allReviews.results);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <h3>Loading content...</h3>;
  } else {
    return (
      <div id="reviewContaining">
        {reviews.map((review) => {
          const formatDate = new Date(review.created_at).toLocaleString(
            "en-US",
            {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }
          );
          return (
            <Link to={`/reviews/${review.review_id}`}>
              <div key={review.review_id} className="review-square">
                <img src={review.review_img_url} alt={review.review_id} />
                <h3>Title: </h3>
                <section className="p">{review.title}</section>
                <h3>The Review: </h3>
                <section className="p">{review.review_body}</section>
                <img src={review.review_img_url} alt={review.title} />
                <h3>Author: </h3>
                <section className="p">{review.owner}</section>
                <h3>Number of votes: </h3>
                <section className="p">{review.votes}</section>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
}
