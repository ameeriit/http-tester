import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isError, setIsError] = useState(false);
  const [textError, setTextError] = useState("");
  const [searchErrorText, setSearchErrorText] = useState(false);
  const [searchMovieText, setSearchMovieText] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchTimer = setTimeout(() => {
      if (searchMovieText && searchMovieText.length > 2) {
        fetchMovies();
      } else if (searchMovieText.length < 1) {
        fetchMovies();
      } else {
        setSearchErrorText("please enter atleast 3 words");
      }
    }, 2000);

    return () => {
      clearTimeout(fetchTimer);
    };
  }, [searchMovieText]);

  const fetchMovies = async () => {
    setLoading(true);
    setSearchErrorText("");
    setIsError(false);
    //fetch movies
    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movies?search=${searchMovieText}`
      );
      setMovies(response.data.moviesData);
      setIsError(false);
      setLoading(false);
    } catch (err) {
      setIsError(true);
      setTextError("Cannot get movies data");
    }
  };
  return (
    <>
      <Link to="/AddMovies"> Add Movie</Link>
      <div>
        <input
          type="text"
          placeholder="Search Here..."
          value={searchMovieText}
          onChange={(e) => {
            setSearchMovieText(e.target.value);
          }}
        />
        <span style={{ color: "red" }}>{searchErrorText}</span>
      </div>
      <div></div>
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
            <div
              style={{ background: "gray", padding: "10px", margin: "20px" }}
            >
              <div>{loading ? <>Loading...</> : <></>}</div>
              {!loading && movies.length < 1 ? (
                <>No movies found</>
              ) : (
                <>
                  {movies.map((el) => (
                    <div key={el.id}>
                      <Link to={`view_movie/${el.id}`}>{el.name}</Link>
                      <img src={el.image} alt="img" />
                      <p>{el.info}</p>
                      <p>{el.rating ? el.rating : 0}</p>
                    </div>
                  ))}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
