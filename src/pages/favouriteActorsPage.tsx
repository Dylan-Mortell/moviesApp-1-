import React from 'react';
import { useFavorites } from '../contexts/favouritesContext';

const FavouriteActorsPage: React.FC = () => {
  const { favoriteActors } = useFavorites();

  return (
    <div>
      <h1>Favorite Actors</h1>
      {favoriteActors.length === 0 ? (
        <p>No favorite actors yet.</p>
      ) : (
        <div>
          {favoriteActors.map((actor) => (
            <div key={actor.id}>
              <h3>{actor.name}</h3>
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouriteActorsPage;
