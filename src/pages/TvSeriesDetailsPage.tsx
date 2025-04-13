import React from "react";
import { useParams } from "react-router-dom";
import PageTemplate from "../components/templateMoviePage";
import { getTvSeriesDetails, getSimilarTvSeries, getTvSeriesCredits } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { MovieDetailsProps, BaseMovieProps, ActorProps } from "../types/interfaces";
import MovieList from "../components/movieList";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import MovieDetails from "../components/movieDetails"; // Reuse this if it works for TV too

const TvSeriesDetailsPage: React.FC = () => {
  const { id } = useParams();

  const { data: tvSeries, error, isLoading, isError } = useQuery<MovieDetailsProps, Error>(
    ["tvSeries", id],
    () => getTvSeriesDetails(id || "")
  );

  const {
    data: similarTvData,
    isLoading: isSimilarLoading,
    isError: isSimilarError,
  } = useQuery(["similarTvSeries", id], () => getSimilarTvSeries(id || ""), { enabled: !!id });

  const {
    data: actorsData,
    isLoading: isActorsLoading,
    isError: isActorsError,
  } = useQuery(["tvCast", id], () => getTvSeriesCredits(id || ""), { enabled: !!id });

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <>
      {tvSeries ? (
        <>
          <PageTemplate movie={tvSeries}>
            <MovieDetails {...tvSeries} />
          </PageTemplate>

          {/* --- Similar TV Series Section --- */}
          <div style={{ margin: "2rem" }}>
            <h2>Similar TV Series</h2>
            {isSimilarLoading && <Spinner />}
            {isSimilarError && <p>Could not load similar TV series.</p>}
            {similarTvData?.results?.length ? (
              <MovieList
                movies={similarTvData.results as BaseMovieProps[]}
                action={(movie: BaseMovieProps) => <AddToFavouritesIcon {...movie} />}
              />
            ) : (
              !isSimilarLoading && <p>No similar series found.</p>
            )}
          </div>

          {/* --- TV Cast Section --- */}
          <div style={{ margin: "2rem" }}>
            <h2>Cast</h2>
            {isActorsLoading && <Spinner />}
            {isActorsError && <p>Could not load cast data.</p>}
            {actorsData?.cast?.length ? (
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {actorsData.cast.map((actor: ActorProps) => (
                  <div key={actor.id} style={{ margin: "1rem", textAlign: "center" }}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={actor.name}
                      style={{ borderRadius: "50%", width: "150px", height: "150px" }}
                    />
                    <h3>{actor.name}</h3>
                    <p>{actor.character}</p>
                  </div>
                ))}
              </div>
            ) : (
              !isActorsLoading && <p>No cast members found for this series.</p>
            )}
          </div>
        </>
      ) : (
        <p>Waiting for TV series details...</p>
      )}
    </>
  );
};

export default TvSeriesDetailsPage;
