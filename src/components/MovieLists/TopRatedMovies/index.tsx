import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";

import { fetchTopRatedMovies } from "../../../store/slices/movieSlice";

const TopRatedMovies: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { topRatedMovies, loading, error } = useSelector(
    (state: RootState) => state.movieLists
  );

  useEffect(() => {
    dispatch(fetchTopRatedMovies());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error}</p>;

  console.log(topRatedMovies);

  return (
    <>
      <div>test</div>
    </>
  );
};

export default TopRatedMovies;
