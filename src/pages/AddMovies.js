import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddMovies = () => {
  const navigate = useNavigate();
  const name_reference = useRef();
  const rating_reference = useRef();
  const description_reference = useRef();

  const addMovieHandler = async (e) => {
    e.preventDefault();

    const movieData = {
      movie_name: name_reference.current.value,
      rating: rating_reference.current.value,
      description: description_reference.current.value,
    };

    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/movies",
        movieData,
        {
          timeout: 1000,
        }
      );
      alert(response.data.message);
      navigate("/");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("try again later");
      }
    }
  };
  return (
    <div>
      <Link to="/"> Home</Link>
      <form onSubmit={addMovieHandler}>
        Movie Name
        <br />
        <input type="text" placeholder="moviename" ref={name_reference} />
        <br />
        <input type="text" placeholder="rating" ref={rating_reference} />
        <br />
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Description"
          ref={description_reference}
        ></textarea>
        <br />
        <button type="submit">Add a movie</button>
      </form>
    </div>
  );
};

export default AddMovies;
