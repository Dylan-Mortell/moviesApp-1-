import React from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getSimilarMovies } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { MovieDetailsProps, BaseMovieProps } from "../types/interfaces";
import MovieList from "../components/movieList";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams();

  // Fetch movie details
  const {
    data: movie,
    error,
    isLoading,
    isError,
  } = useQuery<MovieDetailsProps, Error>(
    ["movie", id],
    () => getMovie(id || "")
  );

  // Fetch similar movies
  const {
    data: similarMoviesData,
    isLoading: isSimilarLoading,
    isError: isSimilarError,
  } = useQuery(
    ["similarMovies", id],
    () => getSimilarMovies(id || ""),
    { enabled: !!id }
  );

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails {...movie} />
          </PageTemplate>

          {/* --- Similar Movies Section --- */}
          <div style={{ margin: "2rem" }}>
            <h2>Similar Movies</h2>

            {isSimilarLoading && <Spinner />}
            {isSimilarError && <p>Could not load similar movies.</p>}

            {similarMoviesData?.results?.length ? (
              <MovieList
                movies={similarMoviesData.results as BaseMovieProps[]}
                action={(movie: BaseMovieProps) => (
                  <AddToFavouritesIcon {...movie} />
                )}
              />
            ) : (
              !isSimilarLoading && <p>No similar movies found.</p>
            )}
          </div>
        </>
      ) : (
        <p>Waiting for movie details...</p>
      )}
    </>
  );
};

export default MovieDetailsPage;
