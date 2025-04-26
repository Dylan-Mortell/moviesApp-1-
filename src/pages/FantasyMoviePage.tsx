import React from "react";
import { useQuery } from "react-query";
import { Grid, Typography, Container } from "@mui/material";
import FantasyMovieCard from "../components/FantasyMovieCard/FantasyMovieCard";
import { getFantasyMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner"; 
const FantasyMoviesPage: React.FC = () => {
  const { data: fantasyMovies, isLoading, isError, error } = useQuery(
    "fantasy-movies",
    getFantasyMovies
  );

  if (isLoading) return <Spinner />;

  if (isError) {
    return (
      <Typography variant="h6" color="error" align="center" sx={{ mt: 5 }}>
        Error: {(error as Error).message}
      </Typography>
    );
  }

  if (!fantasyMovies || fantasyMovies.length === 0) {
    return (
      <Typography variant="h5" align="center" sx={{ mt: 5 }}>
        No fantasy movies found.
      </Typography>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Fantasy Movies
      </Typography>
      <Grid container spacing={3}>
        {fantasyMovies.map((movie, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <FantasyMovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FantasyMoviesPage;
