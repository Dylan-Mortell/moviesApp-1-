import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  addFavoriteTVSeries: (tvSeries: Favorite) => void;
  removeFavoriteTVSeries: (tvSeriesId: string) => void;
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
    const savedFavorites = localStorage.getItem('favoriteActors');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [favoriteTVSeries, setFavoriteTVSeries] = useState<Favorite[]>(() => {
    const savedFavorites = localStorage.getItem('favoriteTVSeries');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const addFavoriteActor = (actor: Favorite) => {
    const updatedFavorites = [...favoriteActors, actor];
    setFavoriteActors(updatedFavorites);
    localStorage.setItem('favoriteActors', JSON.stringify(updatedFavorites));
  };

  const removeFavoriteActor = (actorId: string) => {
    const updatedFavorites = favoriteActors.filter((actor) => actor.id !== actorId);
    setFavoriteActors(updatedFavorites);
    localStorage.setItem('favoriteActors', JSON.stringify(updatedFavorites));
  };

  const addFavoriteTVSeries = (tvSeries: Favorite) => {
    const updatedFavorites = [...favoriteTVSeries, tvSeries];
    setFavoriteTVSeries(updatedFavorites);
    localStorage.setItem('favoriteTVSeries', JSON.stringify(updatedFavorites));
  };

  const removeFavoriteTVSeries = (tvSeriesId: string) => {
    const updatedFavorites = favoriteTVSeries.filter((tvSeries) => tvSeries.id !== tvSeriesId);
    setFavoriteTVSeries(updatedFavorites);
    localStorage.setItem('favoriteTVSeries', JSON.stringify(updatedFavorites));
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteActors,
        favoriteTVSeries,
        addFavoriteActor,
        removeFavoriteActor,
        addFavoriteTVSeries,
        removeFavoriteTVSeries,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
