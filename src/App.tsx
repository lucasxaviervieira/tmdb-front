import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PopularMovies from "./components/MovieLists/PopularMovies";
import TopRatedMovies from "./components/MovieLists/TopRatedMovies";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/1" element={<PopularMovies />}></Route>
          <Route path="/2" element={<TopRatedMovies />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
