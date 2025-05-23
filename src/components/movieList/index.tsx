import React from "react";
import Movie from "../movieCard/";
import Grid from "@mui/material/Grid";
import { BaseMovieListProps, BaseMovieProps } from "../../types/interfaces";

const MovieList: React.FC<BaseMovieListProps> = ({movies, action}) => {
  let movieCards = movies.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Movie key={m.id} movie={m} action={action} selectFavourite={function (movieId: number): void {
              throw new Error("Function not implemented.");
          } }/>
    </Grid>
  ));
  return movieCards;
}

  export default MovieList;
