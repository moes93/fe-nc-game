import { createContext, useState } from "react";

export const CategoryContext = createContext();

export const CategoriesContext = (props) => {
  const [category, setCategory] = useState([]);
  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {props.children}
    </CategoryContext.Provider>
  );
};
