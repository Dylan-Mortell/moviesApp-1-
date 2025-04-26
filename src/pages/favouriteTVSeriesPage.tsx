import React from 'react';
import { useFavorites } from '../contexts/favouritesContext';

const FavouriteTVSeriesPage: React.FC = () => {
  const { favoriteTVSeries } = useFavorites();

  return (
    <div>
      <h1>Favorite TV Series</h1>
      {favoriteTVSeries.length === 0 ? (
        <p>No favorite TV series yet.</p>
      ) : (
        <div>
          {favoriteTVSeries.map((tvSeries) => (
            <div key={tvSeries.id}>
              <h3>{tvSeries.name}</h3>
              <img
                src={`https://image.tmdb.org/t/p/w200${tvSeries.poster_path}`}
                alt={tvSeries.name}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouriteTVSeriesPage;
