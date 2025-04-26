import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Stack,
  Typography,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PageTemplate from "../components/templateMoviePage";
import { MoviesContext } from "../contexts/moviesContext";

const genreOptions = [
  "Action", "Comedy", "Drama", "Fantasy", "Horror", "Romance", "Sci-Fi", "Thriller"
];

const CreateFantasyMoviePage: React.FC = () => {
  const navigate = useNavigate();
  const { addFantasyMovie } = useContext(MoviesContext);

  const [movie, setMovie] = useState({
    title: "",
    overview: "",
    genre: "",
    releaseDate: "",
    runtime: "",
    productionCompany: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addFantasyMovie(movie); // Save to context
    navigate("/fantasy/movies"); // Navigate to a list page (optional)
  };

  return (
    <PageTemplate movie={movie as any}>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Create Your Fantasy Movie
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Title"
              name="title"
              value={movie.title}
              onChange={handleChange}
              required
            />
            <TextField
              label="Overview"
              name="overview"
              value={movie.overview}
              onChange={handleChange}
              multiline
              rows={3}
              required
            />
            <TextField
              select
              label="Genre"
              name="genre"
              value={movie.genre}
              onChange={handleChange}
              required
            >
              {genreOptions.map((g) => (
                <MenuItem key={g} value={g}>
                  {g}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Release Date"
              name="releaseDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={movie.releaseDate}
              onChange={handleChange}
              required
            />
            <TextField
              label="Runtime (minutes)"
              name="runtime"
              type="number"
              value={movie.runtime}
              onChange={handleChange}
              required
            />
            <TextField
              label="Production Company"
              name="productionCompany"
              value={movie.productionCompany}
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Save Fantasy Movie
            </Button>
          </Stack>
        </form>
      </Container>
    </PageTemplate>
  );
};

export default CreateFantasyMoviePage;
