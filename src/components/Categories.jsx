import { useEffect, useState, useContext } from "react";
import { getCategories, getReviews } from "../api";
import {ReviewByCat}  from "./ReviewByCat";
import {CategoryContext} from "../contexts/CategoriesContext"
import {Link} from "react-router-dom"

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
    setFilteredList(filterByCategory)

  };
console.log(categories)
  return (
    <div>
      <h2>Categories</h2>
      <ul>
            {categories.map((category) => {
              return (
                <Link to={`/categories/${category.slug}`} key={category.slug}>
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
                </Link>
              );
            })}
          </ul>

    </div>
  );
};