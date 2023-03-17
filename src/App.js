import "./App.css";
import HomePage from "./pages/HomePage";
import NavBar from "./pages/NavBar";
import {Categories} from "./components/Categories"
import { Routes, Route } from 'react-router-dom';
import {ReviewByCat} from "./components/ReviewByCat"
import {useContext} from "react"
import { CategoryContext } from "./contexts/CategoriesContext";

const App = () => {

  const userValueFromContext = useContext(CategoryContext);
  console.log(userValueFromContext.category, "filtered list app.js")
  const filteredList = userValueFromContext.category

  return (
    <div className="App">
      <h1>My App </h1>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:category" element={<ReviewByCat filteredList={filteredList} />} />
        
        {/* <Route path="/topics" element={<Topics />} />
        <Route path="/about" element={<About />} /> */}
      </Routes>
    </div>
  );
};

export default App;
