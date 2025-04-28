import React from "react";
import { useQuery } from "react-query";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, { titleFilter, genreFilter } from "../components/movieFilterUI";
import PageTemplate from "../components/templateMovieListPage";
import { BaseMovieProps, DiscoverMovies } from "../types/interfaces";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { fetchFilteredMovies } from "../api/tmdb-api";

// Filtering logic
const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};

const genreFiltering = {
  name: "genre",
  value: "0",
};

const premiumGenreFiltering = {
  name: "premium_genre",
  value: "0",
  condition: genreFilter,
};

const HomePage: React.FC = () => {
  const isAuthenticated = localStorage.getItem("token") !== null;

  const filters = isAuthenticated
    ? [titleFiltering, genreFiltering, premiumGenreFiltering]
    : [titleFiltering, genreFiltering];

  const { filterValues, setFilterValues } = useFiltering(filters);

  const { data, error, isLoading, isError } = useQuery(
    ["discover", filterValues],
    fetchFilteredMovies
  );
  
  const changeFilterValues = (type: string, value: string) => {
    const updated = filterValues.map(f =>
      f.name === type ? { ...f, value } : f
    );
    setFilterValues(updated);
  };

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data?.results ?? [];

  return (
    <>
      <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie: BaseMovieProps) => <AddToFavouritesIcon {...movie} />}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues.find(f => f.name === "title")?.value || ""}
        genreFilter={filterValues.find(f => f.name === "genre")?.value || "0"}
        premiumGenreFilter={isAuthenticated ? filterValues.find(f => f.name === "premium_genre")?.value : undefined}
      />
    </>
  );
};

export default HomePage;
