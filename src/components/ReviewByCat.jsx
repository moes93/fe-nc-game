import { Link } from "react-router-dom";
import ReviewCard from "./ReviewCard";

export const ReviewByCat = ({ filteredList }) => {
  return (
    <div>
        {filteredList.map((review) => {
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
          );
        })}
      </div>
  );
};