import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getTvSeries } from "../api/tmdb-api"; // Use the getTvSeries API instead of getUpcomingMovies
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import { BaseMovieProps, DiscoverMovies } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";
import { MoviesContext } from "../contexts/moviesContext";
import { useContext } from "react";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};

const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const TvSeriesPage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
    "Tv Series",
    getTvSeries 
  );

  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

  // Access the MoviesContext to get the addToMustWatch function
  const { addToMustWatch } = useContext(MoviesContext);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const tvSeries = data ? data.results : []; 
  const displayedTvSeries = filterFunction(tvSeries);

  return (
    <>
      <PageTemplate
        title="TV Series"
        movies={displayedTvSeries} 
        action={(movie: BaseMovieProps) => (
          <>
            <AddToFavouritesIcon {...movie} />
            {/* Pass the addToMustWatch function as a prop */}
            <AddToMustWatchIcon movie={movie} addToMustWatch={addToMustWatch} />
          </>
        )}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default TvSeriesPage;
