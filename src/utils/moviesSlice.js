import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    popular: {
      movies: [],
      loading: true,
      currentPage: 1,
      totalPages: 0,
      movieDetails: {},
      castDetails: []
    },
    upcoming: {
      movies: [],
      loading: true,
      currentPage: 1,
      totalPages: 0
    },
    topRated: {
      movies: [],
      loading: true,
      currentPage: 1,
      totalPages: 0
    }
  },
  reducers: {
    setMovies: (state, action) => {
      const { category, movies, totalPages } = action.payload;
      state[category].movies = movies;
      state[category].totalPages = totalPages;
      state[category].loading = false;
    },
    setCurrentPage: (state, action) => {
      const { category, page } = action.payload;
      state[category].currentPage = page;
    },
    setLoading: (state, action) => {
      const { category, loading } = action.payload;
      state[category].loading = loading;
    },
    setMovieDetails: (state, action) => {
      const { movieDetails, castDetails } = action.payload;
      state.popular.movieDetails = movieDetails;
      state.popular.castDetails = castDetails;
    },
    clearMovieDetails: (state) => {
      state.popular.movieDetails = {};
      state.popular.castDetails = [];
    }
  }
});

export const {
  setMovies,
  setCurrentPage,
  setLoading,
  setMovieDetails,
  clearMovieDetails
} = moviesSlice.actions;
export default moviesSlice.reducer;
