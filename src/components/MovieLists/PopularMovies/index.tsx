import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";

import { fetchPopularMovies } from "../../../store/slices/movieSlice";

const PopularMovies: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { popularMovies, loading, error } = useSelector(
    (state: RootState) => state.movieLists
  );

  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error}</p>;

  console.log(popularMovies);

  return (
    <>
      <div>test</div>
    </>
  );
};

export default PopularMovies;
