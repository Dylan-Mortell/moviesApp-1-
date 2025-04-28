const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Basic Movie API
export const getMovies = (page: number = 1) => {
  return fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=${page}`)
    .then((response) => {
      if (!response.ok) throw new Error(`Failed to fetch movies. Status: ${response.status}`);
      return response.json();
    })
    .catch((error) => { throw error; });
};

export const getUpcomingMovies = () => {
  return fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)
    .then((response) => {
      if (!response.ok) throw new Error(`Unable to fetch upcoming movies. Status: ${response.status}`);
      return response.json();
    })
    .catch((error) => { throw error; });
};

export const getMovie = (id: string | number) => {
  return fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
    .then((response) => {
      if (!response.ok) throw new Error(`Failed to get movie data. Status: ${response.status}`);
      return response.json();
    })
    .catch((error) => { throw error; });
};

export const getMovieCredits = (id: string | number) => {
  return fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`)
    .then((response) => {
      if (!response.ok) throw new Error(`Unable to fetch movie credits. Status: ${response.status}`);
      return response.json();
    })
    .catch((error) => { throw error; });
};

export const getSimilarMovies = (id: string | number) => {
  return fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`)
    .then((response) => {
      if (!response.ok) throw new Error(`Unable to fetch similar movies. Status: ${response.status}`);
      return response.json();
    })
    .catch((error) => { throw error; });
};

export const getPopularMovies = () => {
  return fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
    .then((response) => {
      if (!response.ok) throw new Error(`Unable to fetch popular movies. Status: ${response.status}`);
      return response.json();
    })
    .catch((error) => { throw error; });
};

export const getFantasyMovies = async () => {
  const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=14&language=en-US`);
  if (!response.ok) throw new Error(`Failed to fetch fantasy movies. Status: ${response.status}`);
  const data = await response.json();
  return data.results;
};

export const getGenres = () => {
  return fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`)
    .then((response) => {
      if (!response.ok) throw new Error(`Unable to fetch genres. Status: ${response.status}`);
      return response.json();
    })
    .catch((error) => { throw error; });
};

export const getMovieImages = (id: string | number) => {
  return fetch(`${BASE_URL}/movie/${id}/images?api_key=${API_KEY}`)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch movie images");
      return response.json();
    })
    .then((json) => json.posters)
    .catch((error) => { throw error; });
};

export const getMovieReviews = (id: string | number) => {
  return fetch(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((json) => json.results);
};

// TV Series
export const getTvSeries = () => {
  return fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`)
    .then((response) => {
      if (!response.ok) throw new Error(`Unable to fetch TV series. Status: ${response.status}`);
      return response.json();
    })
    .catch((error) => { throw error; });
};

export const getTvSeriesDetails = (id: string | number) => {
  return fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=en-US`)
    .then((response) => {
      if (!response.ok) throw new Error(`Failed to fetch TV series details. Status: ${response.status}`);
      return response.json();
    })
    .catch((error) => { throw error; });
};

export const getSimilarTvSeries = (id: string | number) => {
  return fetch(`${BASE_URL}/tv/${id}/similar?api_key=${API_KEY}&language=en-US`)
    .then((response) => {
      if (!response.ok) throw new Error(`Failed to fetch similar TV series. Status: ${response.status}`);
      return response.json();
    })
    .catch((error) => { throw error; });
};

export const getTvSeriesCredits = (id: string | number) => {
  return fetch(`${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}&language=en-US`)
    .then((response) => {
      if (!response.ok) throw new Error(`Failed to fetch TV series credits. Status: ${response.status}`);
      return response.json();
    })
    .catch((error) => { throw error; });
};

export const getTvSeriesImages = (id: string | number) => {
  return fetch(`${BASE_URL}/tv/${id}/images?api_key=${API_KEY}`)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch TV images");
      return response.json();
    })
    .then((json) => json.posters)
    .catch((error) => { throw error; });
};

export const getTvSeriesReviews = (id: string | number) => {
  return fetch(`${BASE_URL}/tv/${id}/reviews?api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((json) => json.results);
};

//  Multi-Criteria Movie Filtering (server-side)
export const fetchFilteredMovies = async ({ queryKey }: any) => {
  const [_key, filters] = queryKey as [string, { name: string; value: string }[]];
  const filterMap = Object.fromEntries(filters.map(f => [f.name, f.value]));

  const baseUrl = filterMap.title?.trim()
    ? `${BASE_URL}/search/movie`
    : `${BASE_URL}/discover/movie`;

  const params = new URLSearchParams({
    api_key: API_KEY,
    language: 'en-US',
    page: '1',
  });

  if (filterMap.title && baseUrl.includes("search")) {
    params.append("query", filterMap.title);
  }

  if (filterMap.genre && filterMap.genre !== "0") {
    params.append("with_genres", filterMap.genre);
  }

  if (filterMap.premium_genre && filterMap.premium_genre !== "0") {
    params.append("with_genres", filterMap.premium_genre);
  }

  const response = await fetch(`${baseUrl}?${params.toString()}`);
  if (!response.ok) throw new Error("Failed to fetch filtered movies");
  return response.json();
};
