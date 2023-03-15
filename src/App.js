import "./App.css";
import HomePage from "./pages/HomePage";
import NavBar from "./pages/NavBar";
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <h1>My App </h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/topics" element={<Topics />} />
        <Route path="/about" element={<About />} /> */}
      </Routes>
    </div>
  );
};

export default App;
