import React, { useContext } from "react";
import { MoviesContext } from "../contexts/moviesContext";
import { Grid, Typography, Container } from "@mui/material";
import FantasyMovieCard from "../components/FantasyMovieCard/FantasyMovieCard";

const FantasyMoviesPage: React.FC = () => {
  const { fantasyMovies } = useContext(MoviesContext);

  if (!fantasyMovies.length) {
    return (
      <Typography variant="h5" align="center" sx={{ mt: 5 }}>
        No fantasy movies yet. Create one!
      </Typography>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Fantasy Movies
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
