import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../PagesCss/Home.css";
import MovieCard from "../components/MovieCard.jsx";

import {
  SEARCH_MOVIES_API_URL,
  IMG_CDN_URL,
  POPULAR_MOVIES_API_URL
} from "../constants";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const maxPagesToShow = 5;

  // Function to extract query parameters from the URL
  const getSearchQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get("query") || "";
  };

  const fetchMovies = async (page) => {
    setLoading(true);
    const searchQuery = getSearchQuery();
    const url = searchQuery
      ? SEARCH_MOVIES_API_URL(searchQuery, page)
      : POPULAR_MOVIES_API_URL(page);

    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
      setTotalPages(Math.min(data.total_pages, 500));
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

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
    let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    const pages = [];

    if (currentPage > 1) {
      pages.push(
        <button
          key="first"
          className="pagination-button"
          onClick={() => handlePageChange(1)}
        >
          First
        </button>
      );
      pages.push(
        <button
          key="prev"
          className="pagination-button"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-button ${i === currentPage ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages) {
      pages.push(
        <button
          key="next"
          className="pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      );
      pages.push(
        <button
          key="last"
          className="pagination-button"
          onClick={() => handlePageChange(totalPages)}
        >
          Last
        </button>
      );
    }

    return pages;
  };

  const renderSkeletons = () => {
    return Array.from({ length: 30 }, (_, index) => (
      <div key={index} className="movie-card">
        <Skeleton height={200} width={200} />
        <Skeleton height={20} width={150} style={{ marginTop: 10 }} />
        <Skeleton height={15} width={100} style={{ marginTop: 10 }} />
      </div>
    ));
  };

  return (
    <div className="popular-container">
      {loading ? (
        renderSkeletons()
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
      <div className="pagination-container">{renderPagination()}</div>
    </div>
  );
};

export default Home;
