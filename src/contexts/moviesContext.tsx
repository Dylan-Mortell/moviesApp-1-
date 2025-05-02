import React, { useState, useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { BaseMovieProps, Review } from "../types/interfaces";

export interface FantasyMovieFormData {
  title: string;
  overview: string;
  genre: string;
  releaseDate: string;
  runtime: string;
  productionCompany: string;
}

export interface ThemedPlaylist {
  id: string;
  title: string;
  theme: string;
  movieIds: number[];
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

  themedPlaylists: ThemedPlaylist[];
  addPlaylist: (playlist: Omit<ThemedPlaylist, "id">) => void;
  deletePlaylist: (id: string) => void;
  addMovieToPlaylist: (playlistId: string, movieId: number) => void;
  removeMovieFromPlaylist: (playlistId: string, movieId: number) => void;
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
  themedPlaylists: [],
  addPlaylist: () => {},
  deletePlaylist: () => {},
  addMovieToPlaylist: () => {},
  removeMovieFromPlaylist: () => {},
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [favourites, setFavourites] = useState<number[]>([]);
  const [mustWatch, setMustWatch] = useState<number[]>([]);
  const [myReviews, setMyReviews] = useState<{ [id: number]: Review }>({});
  const [fantasyMovies, setFantasyMovies] = useState<FantasyMovieFormData[]>([]);
  const [themedPlaylists, setThemedPlaylists] = useState<ThemedPlaylist[]>([]);

  // Load favourites from localStorage
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

  // Save favourites to localStorage
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

  // Playlist handlers
  const addPlaylist = useCallback((playlist: Omit<ThemedPlaylist, "id">) => {
    const newPlaylist = { ...playlist, id: uuidv4() };
    setThemedPlaylists((prev) => [...prev, newPlaylist]);
  }, []);

  const deletePlaylist = useCallback((id: string) => {
    setThemedPlaylists((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const addMovieToPlaylist = useCallback((playlistId: string, movieId: number) => {
    setThemedPlaylists((prev) =>
      prev.map((p) =>
        p.id === playlistId && !p.movieIds.includes(movieId)
          ? { ...p, movieIds: [...p.movieIds, movieId] }
          : p
      )
    );
  }, []);

  const removeMovieFromPlaylist = useCallback((playlistId: string, movieId: number) => {
    setThemedPlaylists((prev) =>
      prev.map((p) =>
        p.id === playlistId
          ? { ...p, movieIds: p.movieIds.filter((id) => id !== movieId) }
          : p
      )
    );
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
        themedPlaylists,
        addPlaylist,
        deletePlaylist,
        addMovieToPlaylist,
        removeMovieFromPlaylist,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
