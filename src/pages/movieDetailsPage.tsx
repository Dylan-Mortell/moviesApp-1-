import React from "react";
import { Link, useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getSimilarMovies, getMovieCredits } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { MovieDetailsProps, BaseMovieProps, ActorProps } from "../types/interfaces";
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
  } = useQuery<MovieDetailsProps, Error>(["movie", id], () => getMovie(id || ""));

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

  // Fetch actors/cast for the movie
  const {
    data: actorsData,
    isLoading: isActorsLoading,
    isError: isActorsError,
  } = useQuery(
    ["actors", id],
    () => getMovieCredits(id || ""),
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
                action={(movie: BaseMovieProps) => <AddToFavouritesIcon {...movie} />}
              />
            ) : (
              !isSimilarLoading && <p>No similar movies found.</p>
            )}
          </div>

          {/* --- Actors Section --- */}
          <div style={{ margin: "2rem" }}>
            <h2>Actors</h2>
            {isActorsLoading && <Spinner />}
            {isActorsError && <p>Could not load actor data.</p>}
            {actorsData?.cast?.length ? (
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {actorsData.cast.map((actor: ActorProps) => (
                  <div key={actor.id} style={{ margin: "1rem", textAlign: "center" }}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={actor.name}
                      style={{ borderRadius: "50%", width: "150px", height: "150px" }}
                    />
                    <Link to={`/person/${actor.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                      <h3>{actor.name}</h3>
                    </Link>
                    <p>{actor.character}</p>
                  </div>
                ))}
              </div>
            ) : (
              !isActorsLoading && <p>No actors found for this movie.</p>
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
