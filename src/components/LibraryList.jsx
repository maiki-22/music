import { useState, useEffect } from 'react';
import { LibraryIcon } from './resources/Icons';
import PlaylistCard from './resources/PlaylistCard';
import { GetPlaylist } from './Api';

export function LibraryList() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    try {
      GetPlaylist().then((data) => {
        setPlaylists(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4 text-white items-center py-3 px-5 font-medium rounded-lg">
        <LibraryIcon />
        <h1>Library</h1>
      </div>

      <ul>
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            id={playlist.id}
            name={playlist.name}
            image={playlist.image}
          />
        ))}
      </ul>
    </div>
  );
}
