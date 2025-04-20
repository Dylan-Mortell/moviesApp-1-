import React from "react";
import Header from "../headerMovieList"; 
import Grid from "@mui/material/Grid";
import TvSeriesList from "../TvSeriesList/TvSeriesList"; 
import { BaseMovieProps } from "../../types/interfaces"; 
interface TvSeriesListPageTemplateProps {
  tvSeries: BaseMovieProps[];  
  action: (tv: BaseMovieProps) => React.ReactNode;  
}

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  },
};

const TvSeriesListPageTemplate: React.FC<TvSeriesListPageTemplateProps> = ({
  tvSeries,
  title,
  action,
}) => {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <TvSeriesList action={action} tvSeries={tvSeries} /> {/* BaseMovieProps */}
      </Grid>
    </Grid>
  );
};

export default TvSeriesListPageTemplate;
