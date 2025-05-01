import React, { useState, useCallback, useEffect } from "react";
import { BaseMovieProps, Review } from "../types/interfaces";

export interface FantasyMovieFormData {
  title: string;
  overview: string;
  genre: string;
  releaseDate: string;
  runtime: string;
  productionCompany: string;
}

interface MovieContextInterface {
  favourites: number[];
  mustWatch: number[];
  addToFavourites: (movie: BaseMovieProps) => void;
  removeFromFavourites: (movie: BaseMovieProps) => void;
  moveFavouriteUp: (index: number) => void;
  moveFavouriteDown: (index: number) => void;
  addReview: (movie: BaseMovieProps, review: Review) => void;
  addToMustWatch: (movie: BaseMovieProps) => void;
  fantasyMovies: FantasyMovieFormData[];
  addFantasyMovie: (movie: FantasyMovieFormData) => void;
}

const initialContextState: MovieContextInterface = {
  favourites: [],
  mustWatch: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  moveFavouriteUp: () => {},
  moveFavouriteDown: () => {},
  addReview: () => {},
  addToMustWatch: () => {},
  fantasyMovies: [],
  addFantasyMovie: () => {},
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [favourites, setFavourites] = useState<number[]>([]);
  const [mustWatch, setMustWatch] = useState<number[]>([]);
  const [myReviews, setMyReviews] = useState<{ [id: number]: Review }>({});
  const [fantasyMovies, setFantasyMovies] = useState<FantasyMovieFormData[]>([]);

  //  Load favourites on initial render
  useEffect(() => {
    const stored = localStorage.getItem("movieFavourites");
    if (stored) {
      try {
        setFavourites(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored favourites:", e);
      }
    }
  }, []);

  //  Save favourites whenever they change
  useEffect(() => {
    localStorage.setItem("movieFavourites", JSON.stringify(favourites));
  }, [favourites]);

  const addToFavourites = useCallback((movie: BaseMovieProps) => {
    setFavourites((prev) => (prev.includes(movie.id) ? prev : [...prev, movie.id]));
  }, []);

  const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
    setFavourites((prev) => prev.filter((id) => id !== movie.id));
  }, []);

  const moveFavouriteUp = useCallback((index: number) => {
    setFavourites((prev) => {
      if (index <= 0) return prev;
      const updated = [...prev];
      [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
      return updated;
    });
  }, []);

  const moveFavouriteDown = useCallback((index: number) => {
    setFavourites((prev) => {
      if (index >= prev.length - 1) return prev;
      const updated = [...prev];
      [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
      return updated;
    });
  }, []);

  const addReview = useCallback((movie: BaseMovieProps, review: Review) => {
    setMyReviews((prev) => ({ ...prev, [movie.id]: review }));
  }, []);

  const addToMustWatch = useCallback((movie: BaseMovieProps) => {
    setMustWatch((prev) => (prev.includes(movie.id) ? prev : [...prev, movie.id]));
  }, []);

  const addFantasyMovie = useCallback((movie: FantasyMovieFormData) => {
    setFantasyMovies((prev) => [...prev, movie]);
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        mustWatch,
        addToFavourites,
        removeFromFavourites,
        moveFavouriteUp,
        moveFavouriteDown,
        addReview,
        addToMustWatch,
        fantasyMovies,
        addFantasyMovie,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
