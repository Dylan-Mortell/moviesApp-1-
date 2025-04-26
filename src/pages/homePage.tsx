import React from "react";
import { useQuery } from "react-query";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, { titleFilter, genreFilter } from "../components/movieFilterUI";
import PageTemplate from "../components/templateMovieListPage";
import { BaseMovieProps, DiscoverMovies } from "../types/interfaces";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};

const genreFiltering = {
  name: "genre",
  value: "0", 
};

// Premium filters (available only to authenticated users)
const premiumGenreFiltering = {
  name: "premium_genre",
  value: "0",  // Default genre for premium
  condition: genreFilter, 
};

const HomePage: React.FC = () => {
  const isAuthenticated = localStorage.getItem("token") !== null; // Check if the user is authenticated
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>("discover", getMovies);

  // Conditionally apply filters based on whether the user is authenticated
  const filters = isAuthenticated
    ? [titleFiltering, genreFiltering, premiumGenreFiltering]  
    : [titleFiltering, genreFiltering];  

  const { filterValues, setFilterValues, filterFunction } = useFiltering(filters);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // Filter the movies using filterFunction from useFiltering hook
  const movies = data ? data.results : [];
  const displayedMovies = filterFunction(movies);

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1], filterValues[2]]  
        : type === "premium_genre"
        ? [filterValues[0], filterValues[1], changedFilter]
        : [filterValues[0], changedFilter, filterValues[2]]; 

    setFilterValues(updatedFilterSet);
  };

  return (
    <>
      <PageTemplate
        title="Discover Movies"
        movies={displayedMovies}  // Display filtered movies
        action={(movie: BaseMovieProps) => {
          return <AddToFavouritesIcon {...movie} />;
        }}
      />
      
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        // Pass the premium genre filter value if available
        premiumGenreFilter={isAuthenticated ? filterValues[2].value : undefined}
      />
    </>
  );
};

export default HomePage;
