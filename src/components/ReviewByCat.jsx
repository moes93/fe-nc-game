import { Link, useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import { getReviewsByCategory } from "../api";
import {useState, useEffect} from "react"

export const ReviewByCat = () => {
  const { category } = useParams();
  const [filteredList, setFilteredList] = useState([]);
  useEffect(()=>{
getReviewsByCategory(category).then((reviews)=>{
    setFilteredList(reviews)
})
  },[])
  console.log(filteredList)
  return (
    <div>
      {filteredList.map((review) => {
        const formatDate = new Date(review.created_at).toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        });
        return (
          <ReviewCard
            key={review.review_id}
            review={review}
            formatDate={formatDate}
          />
        );
      })}
    </div>
  );
};
