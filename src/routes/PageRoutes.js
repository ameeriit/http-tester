import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SingleMoviePage from "../pages/SingleMoviePage";
import AddMovies from "../pages/AddMovies";

const PageRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/view_movie/:id?" element={<SingleMoviePage />} exact />
        <Route path="/AddMovies" element={<AddMovies />} exact />
      </Routes>
    </>
  );
};

export default PageRoutes;
