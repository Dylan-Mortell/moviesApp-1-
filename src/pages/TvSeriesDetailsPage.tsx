import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { TvSeriesDetailsProps, BaseMovieProps, ActorProps } from "../types/interfaces";
import { getTvSeriesDetails, getSimilarTvSeries, getTvSeriesCredits } from "../api/tmdb-api";
import TemplateTvSeriesPage from "../components/templateTvSeriesPage/templateTvSeriesPage"; 
import TvSeriesDetails from "../components/TvSeriesDetails/TvSeriesDetails";
import MovieList from "../components/movieList";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import TvSeriesList from "../components/TvSeriesList/TvSeriesList";


const TvSeriesDetailsPage: React.FC = () => {
  const { id } = useParams();

  const { data: tvSeries, error, isLoading, isError } = useQuery<TvSeriesDetailsProps, Error>(
    ["tvSeries", id],
    () => getTvSeriesDetails(id || "")
  );

  const { data: similarTvData, isLoading: isSimilarLoading, isError: isSimilarError } = useQuery(
    ["similarTvSeries", id],
    () => getSimilarTvSeries(id || ""),
    { enabled: !!id }
  );

  const { data: actorsData, isLoading: isActorsLoading, isError: isActorsError } = useQuery(
    ["tvCast", id],
    () => getTvSeriesCredits(id || ""),
    { enabled: !!id }
  );

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return tvSeries ? (
    <>
      <TemplateTvSeriesPage tvSeries={tvSeries}>
        <TvSeriesDetails {...tvSeries} />
      </TemplateTvSeriesPage>

     {/* --- Similar Section --- */}
<div style={{ margin: "2rem" }}>
  <h2>Similar TV Series</h2>
  {isSimilarLoading && <Spinner />}
  {isSimilarError && <p>Could not load similar TV series.</p>}
  {similarTvData?.results?.length ? (
    <TvSeriesList
      tvSeries={similarTvData.results as BaseMovieProps[]}
      action={(tv: BaseMovieProps) => <AddToFavouritesIcon {...tv} />}
    />
  ) : (
    !isSimilarLoading && <p>No similar series found.</p>
  )}
</div>

      {/* --- Cast Section --- */}
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
  );
};

export default TvSeriesDetailsPage;
