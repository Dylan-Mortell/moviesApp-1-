import React from "react";
import TvSeriesCard from "../TvSeriesCard/TvSeriesCard";
import Grid from "@mui/material/Grid";
import { BaseMovieProps, TvSeriesDetailsProps } from "../../types/interfaces";

interface TvSeriesListProps {
    tvSeries: BaseMovieProps[]; 
    action: (tv: BaseMovieProps) => React.ReactNode;
  }

const TvSeriesList: React.FC<TvSeriesListProps> = ({ tvSeries, action }) => {
  return (
    <>
      {tvSeries.map((tv) => (
        <Grid key={tv.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <TvSeriesCard
            tvSeries={tv}
            action={action}
            selectFavourite={() => {
              throw new Error("Function not implemented.");
            }}
          />
        </Grid>
      ))}
    </>
  );
};

export default TvSeriesList;
