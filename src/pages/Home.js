import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isError, setIsError] = useState(false);
  const [textError, setTextError] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setIsError(false);
    //fetch movies
    try {
      const response = await axios.get(
        "https://api.dynoacademy.com/test-api/v1/movies"
      );
      setMovies(response.data.moviesData);
      setIsError(false);
    } catch (err) {
      setIsError(true);
      setTextError("Cannot get movies data");
    }
  };
  return (
    <div>
      {isError ? (
        <>
          <div
            style={{
              background: "red",
              color: "white",
              padding: "20px",
              margin: "20px",
            }}
          >
            {textError}
          </div>
        </>
      ) : (
        <>
          <div style={{ background: "gray", padding: "10px", margin: "20px" }}>
            {movies.map((el) => (
              <div key={el.id}>
                <Link to={`view_movie/${el.id}`}>{el.name}</Link>
                <img src={el.image} alt="img" />
                <p>{el.info}</p>
                <p>{el.rating ? el.rating : 0}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
