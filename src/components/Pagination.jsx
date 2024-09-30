import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../utils/moviesSlice"; // Adjust the path

const Pagination = ({ category, maxPagesToShow = 3 }) => {
  const { currentPage, totalPages } = useSelector(
    (state) => state.movies[category]
  );
  const dispatch = useDispatch();

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      dispatch(setCurrentPage({ category, page }));
    }
  };

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
        1st
      </button>
    );
    pages.push(
      <button
        key="prev"
        className="pagination-button"
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Prev
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

  return <div className="pagination-container">{pages}</div>;
};

export default Pagination;
