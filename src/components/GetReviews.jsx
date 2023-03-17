import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReviews } from "../api";
import ReviewCard from "./ReviewCard";

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

            <ReviewCard key={review.review_id} review={review} formatDate={formatDate}/>
            // <Link to={`/reviews/${review.review_id}`}>
              
            // </Link>
          );
        })}
      </div>
    );
  }
}
