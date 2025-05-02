import React, { useContext } from 'react';
import { MoviesContext } from '../contexts/moviesContext';

const ThemedPlaylistsPage: React.FC = () => {
  const { playlists } = useContext(MoviesContext);

  return (
    <div>
      <h1>Themed Movie Playlists</h1>
      {playlists.length === 0 ? (
        <p>No playlists created yet.</p>
      ) : (
        <div>
          {playlists.map((playlist, idx) => (
            <div key={idx} style={{ marginBottom: "2rem", border: "1px solid #ccc", padding: "1rem" }}>
              <h3>{playlist.title}</h3>
              <p><strong>Theme:</strong> {playlist.theme}</p>
              {playlist.movieIds.length === 0 ? (
                <p>No movies in this playlist.</p>
              ) : (
                <ul>
                  {playlist.movieIds.map((id) => (
                    <li key={id}>Movie ID: {id}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemedPlaylistsPage;
