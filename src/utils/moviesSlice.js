import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    loading: true,
    currentPage: 1,
    totalPages: 0
  },
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload.movies;
      state.loading = action.payload.loading;
      state.totalPages = action.payload.totalPages;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setMovies, setCurrentPage, setLoading } = moviesSlice.actions;
export default moviesSlice.reducer;
