import React from 'react';
import { useFavorites } from '../contexts/favouritesContext';

const FavouriteActorsPage: React.FC = () => {
  const {
    favoriteActors,
    moveActorUp,
    moveActorDown,
    removeFavoriteActor,
  } = useFavorites();

  return (
    <div>
      <h1>Favorite Actors</h1>
      {favoriteActors.length === 0 ? (
        <p>No favorite actors yet.</p>
      ) : (
        <div>
          {favoriteActors.map((actor, index) => (
            <div key={actor.id} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
              <h3>{actor.name}</h3>
              {actor.profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  style={{ display: 'block', marginBottom: '0.5rem' }}
                />
              )}
              <div>
                <button onClick={() => moveActorUp(index)} disabled={index === 0}>
                  ↑ Move Up
                </button>
                <button onClick={() => moveActorDown(index)} disabled={index === favoriteActors.length - 1}>
                  ↓ Move Down
                </button>
                <button onClick={() => removeFavoriteActor(actor.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouriteActorsPage;
