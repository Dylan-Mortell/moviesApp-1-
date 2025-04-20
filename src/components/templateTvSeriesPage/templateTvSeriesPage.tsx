import React from "react";
import MovieHeader from "../headerMovie"; // ✅ reuse the same header
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getTvSeriesImages } from "../../api/tmdb-api";
import { MovieImage, TvSeriesDetailsProps } from "../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../spinner";

const styles = {
  gridListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  gridListTile: {
    width: 450,
    height: '100vh',
  },
};

interface TemplateTvSeriesPageProps {
  tvSeries: TvSeriesDetailsProps;
  children: React.ReactElement;
}

const TemplateTvSeriesPage: React.FC<TemplateTvSeriesPageProps> = ({ tvSeries, children }) => {
  const { data, error, isLoading, isError } = useQuery<MovieImage[], Error>(
    ["tvImages", tvSeries.id],
    () => getTvSeriesImages(tvSeries.id)
  );

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const images = data as MovieImage[];

  return (
    <>
      <MovieHeader {...tvSeries} />

      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid item xs={3}>
          <div>
            <ImageList cols={1}>
              {images.map((image: MovieImage) => (
                <ImageListItem
                  key={image.file_path}
                  sx={styles.gridListTile}
                  cols={1}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                    alt={"TV still"}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </Grid>

        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateTvSeriesPage;
