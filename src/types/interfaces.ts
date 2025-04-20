export interface BaseMovieProps {
    title: string;
    budget: number;
    homepage: string | undefined;
    id: number;
    imdb_id: string;
    original_language: string;
    overview: string;
    release_date: string;
    vote_average: number;
    popularity: number;
    poster_path?: string;
    tagline: string;
    runtime: number;
    revenue: number;
    vote_count: number;
    favourite?: boolean;
    genre_ids?: number[];
    name?: string;
    first_air_date?: string;
  }

  export interface BaseMovieListProps {
    movies: BaseMovieProps[];
    action: (m: BaseMovieProps) => React.ReactNode;
  }

  interface TvSeriesListProps {
    tvSeries: BaseMovieProps[];
    action: (tv: BaseMovieProps) => React.ReactNode;
  }

  export interface MovieDetailsProps extends BaseMovieProps {
    genres: {
      id: number;
      name: string;
    }[];
  }

  export interface TvSeriesDetailsProps extends MovieDetailsProps {
    name: string;
    first_air_date: string;
    last_air_date: string;
    episode_run_time: number[];  
    seasons: { id: number; season_number: number }[];

}


  export interface MovieImage {
    file_path: string;
    aspect_ratio?: number; 
    height?: number;
    iso_639_1?: string;
    vote_average?: number;
    vote_count?: number;
    width?: number;
  }
  
  export interface MoviePageProps {
    movie: MovieDetailsProps;
    images: MovieImage[];
  }

  export type FilterOption = "title" | "genre";


  export interface GenreData {
    genres: {
      id: string;
      name: string
    }[];
  }
  
  export interface DiscoverMovies {
    page: number;	
    total_pages: number;
    total_results: number;
    results: BaseMovieProps[];
  }

  export interface MovieListPageTemplateProps extends BaseMovieListProps {
    title: string;
  }

  export interface Review {
    id: string;
    author: string;
    content: string;
    agree?: boolean;
    rating?: number;
    movieId?: number;
    tvSeriesId?: number;
  }
  
  export interface ActorProps {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }

  
