import React from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPages"; 
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import UpcomingMoviePage from "./pages/UpcomingMoviePage";
import PopularMoviePage from "./pages/PopularMoviePage";
import TvSeriesPage from "./pages/TvSeriesPage";
import TvSeriesDetailsPage from "./pages/TvSeriesDetailsPage";
import FantasyMoviesPage from "./pages/FantasyMoviePage";
import PrivateRoute from './routes/PrivateRoute'; 

// Create the QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});  

const App = () => {
  // Check if the user is authenticated by verifying token in localStorage
  const isAuthenticated = localStorage.getItem("token") !== null;

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/movies/upcoming" element={<UpcomingMoviePage />} />
            <Route path="/movies/popular" element={<PopularMoviePage />} />
            <Route path="/TvSeries" element={<TvSeriesPage />} />
            <Route path="/TvSeries/:id" element={<TvSeriesDetailsPage />} />
            <Route path="/fantasy/movies" element={<FantasyMoviesPage />} />

            {/* Private Routes (protected by authentication) */}
            <Route 
              path="/movies/favourites" 
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <FavouriteMoviesPage />
                </PrivateRoute>
              }
            />
            <Route 
              path="/reviews/form" 
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <AddMovieReviewPage />
                </PrivateRoute>
              }
            />

            {/* Public Routes for Reviews */}
            <Route path="/reviews/:id" element={<MovieReviewPage />} />

            {/* Catch-all route for 404 */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
