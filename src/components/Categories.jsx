import { useEffect, useState, useContext } from "react";
import { getCategories, getReviews } from "../api";
import {ReviewByCat}  from "./ReviewByCat";
import {CategoryContext} from "../contexts/CategoriesContext"

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const userValueFromContext = useContext(CategoryContext);


  useEffect(() => {
    setIsLoading(true);
    getCategories().then((categories) => {
      setCategories(categories);
      setIsLoading(false);
    });
    getReviews().then((allReviews) => {
        setReviews(allReviews.results);
      });
  }, []);
  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  const handleCategory = (category) => {
    const filterByCategory = reviews.filter((review) => {
      return review.category === category;
    });
    setFilteredList(filterByCategory).then((list)=>{
        userValueFromContext.setCategories(list)
    })

  };

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => {
          return (
            <li key={category.slug}>
              <button
                type="button"
                onClick={() => {
                  handleCategory(category.slug);
                }}
              >
                {category.slug}
              </button>
            </li>
          );
        })}
      </ul>
     

    </div>
  );
};