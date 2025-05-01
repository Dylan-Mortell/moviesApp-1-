import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Favorite {
  id: string;
  name: string;
  profile_path?: string;
}

interface FavoritesContextType {
  favoriteActors: Favorite[];
  favoriteTVSeries: Favorite[];
  addFavoriteActor: (actor: Favorite) => void;
  removeFavoriteActor: (actorId: string) => void;
  moveActorUp: (index: number) => void;
  moveActorDown: (index: number) => void;
  addFavoriteTVSeries: (tvSeries: Favorite) => void;
  removeFavoriteTVSeries: (tvSeriesId: string) => void;
  moveTVSeriesUp: (index: number) => void;
  moveTVSeriesDown: (index: number) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favoriteActors, setFavoriteActors] = useState<Favorite[]>(() => {
    const saved = localStorage.getItem('favoriteActors');
    return saved ? JSON.parse(saved) : [];
  });

  const [favoriteTVSeries, setFavoriteTVSeries] = useState<Favorite[]>(() => {
    const saved = localStorage.getItem('favoriteTVSeries');
    return saved ? JSON.parse(saved) : [];
  });

  // ----- Actor Functions -----
  const addFavoriteActor = (actor: Favorite) => {
    if (!favoriteActors.find((a) => a.id === actor.id)) {
      const updated = [...favoriteActors, actor];
      setFavoriteActors(updated);
      localStorage.setItem('favoriteActors', JSON.stringify(updated));
    }
  };

  const removeFavoriteActor = (actorId: string) => {
    const updated = favoriteActors.filter((actor) => actor.id !== actorId);
    setFavoriteActors(updated);
    localStorage.setItem('favoriteActors', JSON.stringify(updated));
  };

  const moveActorUp = (index: number) => {
    if (index <= 0) return;
    const updated = [...favoriteActors];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setFavoriteActors(updated);
    localStorage.setItem('favoriteActors', JSON.stringify(updated));
  };

  const moveActorDown = (index: number) => {
    if (index >= favoriteActors.length - 1) return;
    const updated = [...favoriteActors];
    [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
    setFavoriteActors(updated);
    localStorage.setItem('favoriteActors', JSON.stringify(updated));
  };

  // ----- TV Series Functions -----
  const addFavoriteTVSeries = (tvSeries: Favorite) => {
    if (!favoriteTVSeries.find((s) => s.id === tvSeries.id)) {
      const updated = [...favoriteTVSeries, tvSeries];
      setFavoriteTVSeries(updated);
      localStorage.setItem('favoriteTVSeries', JSON.stringify(updated));
    }
  };

  const removeFavoriteTVSeries = (tvSeriesId: string) => {
    const updated = favoriteTVSeries.filter((tv) => tv.id !== tvSeriesId);
    setFavoriteTVSeries(updated);
    localStorage.setItem('favoriteTVSeries', JSON.stringify(updated));
  };

  const moveTVSeriesUp = (index: number) => {
    if (index <= 0) return;
    const updated = [...favoriteTVSeries];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setFavoriteTVSeries(updated);
    localStorage.setItem('favoriteTVSeries', JSON.stringify(updated));
  };

  const moveTVSeriesDown = (index: number) => {
    if (index >= favoriteTVSeries.length - 1) return;
    const updated = [...favoriteTVSeries];
    [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
    setFavoriteTVSeries(updated);
    localStorage.setItem('favoriteTVSeries', JSON.stringify(updated));
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteActors,
        favoriteTVSeries,
        addFavoriteActor,
        removeFavoriteActor,
        moveActorUp,
        moveActorDown,
        addFavoriteTVSeries,
        removeFavoriteTVSeries,
        moveTVSeriesUp,
        moveTVSeriesDown,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
