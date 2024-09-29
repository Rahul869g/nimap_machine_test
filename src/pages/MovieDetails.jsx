import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMovieDetails, clearMovieDetails } from "../utils/moviesSlice";
import {
  MOVIE_DETAILS_API_URL,
  MOVIE_CAST_API_URL,
  IMG_CDN_URL
} from "../constants";
import "../ComponentCss/MovieDetails.css";
import CastCard from "../Components/CastCard.jsx";

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movieDetails, castDetails } = useSelector(
    (state) => state.movies.popular
  );

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await fetch(MOVIE_DETAILS_API_URL(id));
        const movieData = await movieResponse.json();

        const castResponse = await fetch(MOVIE_CAST_API_URL(id));
        const castData = await castResponse.json();

        dispatch(
          setMovieDetails({
            movieDetails: movieData,
            castDetails: castData.cast.slice(0, 6)
          })
        );
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();

    return () => {
      dispatch(clearMovieDetails());
    };
  }, [id, dispatch]);

  if (!movieDetails.title) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="outer-container">
        <div className="main-container">
          <div className="left">
            <div className="top-section">
              <img
                src={`${IMG_CDN_URL}${movieDetails.poster_path}`}
                alt={movieDetails.title}
                className="left-image"
              />
              <div className="details">
                <p className="title">{movieDetails.title}</p>
                <p className="rating">Rating: {movieDetails.vote_average}</p>
                <div className="inner-details">
                  <p className="duration">{movieDetails.runtime} mins</p>
                  <p className="genre">
                    {movieDetails.genres?.map((genre) => genre.name).join(", ")}
                  </p>
                </div>
                <p className="release-date">
                  Release Date: {movieDetails.release_date}
                </p>
              </div>
            </div>

            <div className="overview">
              <h3>Overview</h3>
              <p className="overview-text">{movieDetails.overview}</p>
            </div>
          </div>

          <div className="right">
            <img
              src={`${IMG_CDN_URL}${movieDetails.backdrop_path}`}
              alt={movieDetails.title}
              className="right-image"
            />
          </div>
        </div>
      </div>

      <div className="CastContainer">
        {castDetails.map((castMember) => (
          <CastCard
            key={castMember.cast_id}
            image={`${IMG_CDN_URL}${castMember.profile_path}`}
            name={castMember.name}
            character={castMember.character}
          />
        ))}
      </div>
    </>
  );
};

export default MovieDetails;
