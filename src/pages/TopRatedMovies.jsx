import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../PagesCss/Home.css";
import SkeletonLoader from "../components/SkeletonLoader";
import Pagination from "../components/Pagination";
import MovieCard from "../components/MovieCard.jsx";

import {
  SEARCH_MOVIES_API_URL,
  IMG_CDN_URL,
  TOP_RATED_MOVIES_API_URL
} from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { setMovies, setCurrentPage, setLoading } from "../utils/moviesSlice"; // Adjust the path

const TopRatedMovies = () => {
  const { movies, loading, currentPage } = useSelector(
    (state) => state.movies.topRated
  );
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  // Function to extract query parameters from the URL
  const getSearchQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get("query") || "";
  };

  const fetchMovies = async (page) => {
    dispatch(setLoading({ category: "topRated", loading: true }));
    const searchQuery = getSearchQuery();
    const url = searchQuery
      ? SEARCH_MOVIES_API_URL(searchQuery, page)
      : TOP_RATED_MOVIES_API_URL(page);

    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch(
        setMovies({
          category: "topRated",
          movies: data.results,
          loading: false,
          totalPages: Math.min(data.total_pages, 500)
        })
      );
    } catch (error) {
      console.error("Error fetching the movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [location, currentPage]);

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <>
      <div className="popular-container">
        {loading ? (
          <SkeletonLoader />
        ) : movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              image={`${IMG_CDN_URL}${movie.poster_path}`}
              title={movie.title}
              rating={movie.vote_average}
              onClick={() => handleMovieClick(movie.id)}
            />
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>
      <br></br>
      <Pagination category="topRated" />
    </>
  );
};

export default TopRatedMovies;
