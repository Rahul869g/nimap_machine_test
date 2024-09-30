// API key for The Movie Database (TMDb)
export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Base URL for TMDb API
export const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";

// Image CDN URL for Movie Posters
export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";

// Movie Details API URL
export const MOVIE_DETAILS_API_URL = (movie_id) =>
  `${TMDB_API_BASE_URL}/movie/${movie_id}?api_key=${API_KEY}&language=en-US`;

// Movie Cast API URL
export const MOVIE_CAST_API_URL = (movie_id) =>
  `${TMDB_API_BASE_URL}/movie/${movie_id}/credits?api_key=${API_KEY}&language=en-US`;

// Popular Movies API URL
export const POPULAR_MOVIES_API_URL = (page) =>
  `${TMDB_API_BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;

// Upcoming Movies API URL
export const UPCOMING_MOVIES_API_URL = (page) =>
  `${TMDB_API_BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`;

// Top Rated Movies API URL
export const TOP_RATED_MOVIES_API_URL = (page) =>
  `${TMDB_API_BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;

// Search Movies API URL
export const SEARCH_MOVIES_API_URL = (movie_name, page) =>
  `${TMDB_API_BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${movie_name}&page=${page}`;
