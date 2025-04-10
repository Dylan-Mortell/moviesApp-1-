import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import MovieList from "../movieList";
import Spinner from "../spinner";
import { useQuery } from "react-query";
import { getMovieImages } from "../../api/tmdb-api"; // Assuming this is your fetch function
import { MovieListPageTemplateProps, MovieImage } from "../../types/interfaces";

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  },
};

const TemplateMoviePage: React.FC<TemplateMoviePageProps> = ({movie, children}) => {
    const { data, error, isLoading, isError } = useQuery<MovieImage[], Error>(
        ["images", movie.id],
        () => getMovieImages(movie.id)
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{(error

        ).message}</h1>;
    }

    const images = data as MovieImage[];

    return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <MovieList movies={movie} selectFavourite={selectFavourite} />
      </Grid>
      {children}
    </Grid>
  );
};

export default TemplateMoviePage;
