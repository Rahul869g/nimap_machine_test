import { createRoot } from "react-dom/client";
import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";

import AppLayout from "./AppLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import TopRatedMovies from "./pages/TopRatedMovies.jsx";
import UpcomingMovies from "./pages/UpcomingMovies.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Navigate to="/popular" replace={true} />
      },
      {
        path: "/popular",
        element: <HomePage />
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
        element: <HomePage />
      }
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRouter} />
);
