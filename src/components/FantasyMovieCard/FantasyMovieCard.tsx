import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { FantasyMovieFormData } from "../../contexts/moviesContext";
import { useNavigate } from "react-router-dom";

interface FantasyCardProps {
  movie: FantasyMovieFormData;
}

const FantasyMovieCard: React.FC<FantasyCardProps> = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={
          <Typography variant="h6" component="p">
            {movie.title}
          </Typography>
        }
      />
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="body2">{movie.genre}</Typography>
          <Typography variant="body2">{movie.releaseDate}</Typography>
          <Typography variant="body2">{movie.productionCompany}</Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate("/fantasy/details", { state: { movie } })}
        >
          More Info
        </Button>
      </CardActions>
    </Card>
  );
};

export default FantasyMovieCard;
