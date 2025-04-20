import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Avatar
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import { Link } from "react-router-dom";
import { BaseMovieProps } from "../../types/interfaces";

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
};

interface TvSeriesCardProps {
  tvSeries: BaseMovieProps;
  action: (tv: BaseMovieProps) => React.ReactNode;
}

const TvSeriesCard: React.FC<TvSeriesCardProps> = ({ tvSeries, action }) => {
  const linkTarget = `/TvSeries/${tvSeries.id}`;

  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={
          <Avatar sx={styles.avatar}>
            <FavoriteIcon />
          </Avatar>
        }
        title={
          <Link to={linkTarget} style={styles.link}>
            <Typography variant="h6" component="p">
              {tvSeries.name || tvSeries.title}
            </Typography>
          </Link>
        }
      />
      <Link to={linkTarget}>
        <CardMedia
          sx={styles.media}
          image={
            tvSeries.poster_path
              ? `https://image.tmdb.org/t/p/w500/${tvSeries.poster_path}`
              : "/default-poster.png"
          }
          title={tvSeries.name || tvSeries.title}
        />
      </Link>
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="body1" component="p">
              <CalendarIcon fontSize="small" />{" "}
              {tvSeries.first_air_date || "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" component="p">
              <StarRateIcon fontSize="small" />{" "}
              {tvSeries.vote_average || "0.0"}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action(tvSeries)}
        <Link to={linkTarget}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default TvSeriesCard;
