import "./App.css";
import { useEffect, useContext, useState } from "react";
import { getUsers } from "./api";
import { UserContext } from "./contexts/LoggedInUserContext";
import HomePage from "./pages/HomePage";
import { UsersLogin } from "./components/UsersLogin";
import NavBar from "./pages/NavBar";
import GetReviews from "./components/GetReviews";
import { ReviewById } from "./components/ReviewById";
import { Routes, Route } from "react-router-dom";
import {ReviewByCat} from "./components/ReviewByCat"
import { CategoryContext } from "./contexts/CategoriesContext";
import { Categories } from "./components/Categories.jsx";





const App = () => {
  // const userValueFromContextCat = useContext(CategoryContext);
  // const filteredList = userValueFromContextCat.category
  // console.log(userValueFromContext.category, "------------>filtered list app.js")
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const userValueFromContext = useContext(UserContext);

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  return (
    <div className="App">
      <h1>My App </h1>
      <p>Logged in as {userValueFromContext.user.username}</p>
      <NavBar />
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<UsersLogin users={users} />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/reviews" element={<GetReviews />} />
        <Route path="/reviews/:review_id" element={<ReviewById />} />
        <Route path="/categories/:category" element={<ReviewByCat  />} />
        <Route path="/categories" element={<Categories reviews={reviews} />} />
      </Routes>
    </div>
  );
};

export default App;
