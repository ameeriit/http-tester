import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleMoviePage = () => {
  const [singleMovieData, setSingleMovieData] = useState({});

  const getParams = useParams();
  const getID = getParams.id;

  useEffect(() => {
    getSingleMovieInfo();
  });

  const getSingleMovieInfo = async () => {
    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movie/${getID}`
      );
      setSingleMovieData(response.data.singleMovieData);
    } catch (err) {
      alert("error");
    }
  };

  return (
    <div>
      Single movie page{getID}
      Movie Name{singleMovieData.name}
      Movie Info{singleMovieData.info}
      Image <img src={singleMovieData.image} alt="" />
    </div>
  );
};

export default SingleMoviePage;
