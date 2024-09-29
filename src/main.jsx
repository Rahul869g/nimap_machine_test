import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AppLayout from "./AppLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import PopularMovies from "./pages/PopularMovies.jsx";
import TopRatedMovies from "./pages/TopRatedMovies.jsx";
import UpcomingMovies from "./pages/UpcomingMovies.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import SearchResults from "./pages/SearchResults.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/popular",
        element: <PopularMovies />
      },
      {
        path: "/top-rated",
        element: <TopRatedMovies />
      },
      {
        path: "/upcoming",
        element: <UpcomingMovies />
      },
      {
        path: "movie/:id",
        element: <MovieDetails />
      },
      {
        path: "search",
        element: <SearchResults />
      }
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRouter} />
);
