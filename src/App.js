import "./App.css";
import {useEffect, useContext, useState} from "react";
import { getUsers } from "./api";
import { LoggedInUserProvider } from "./contexts/LoggedInUserContext";
import HomePage from "./pages/HomePage";
import { UsersLogin } from "./components/UsersLogin";
import NavBar from "./pages/NavBar";
import { ReviewById } from "./components/ReviewById";
import { Routes, Route } from 'react-router-dom';

const App = () => {

  const [users, setUsers] = useState([]);
  const userValueFromContext = useContext(LoggedInUserProvider);

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  console.log(users,"users in app.js");

  return (
    <div className="App">
      <h1>My App </h1>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<UsersLogin users={users} />} />
        <Route path="/homepage" element={<HomePage />} />

        <Route path="/reviews/:review_id" element={<ReviewById />} />
      </Routes>
    </div>
  );
};

export default App;
