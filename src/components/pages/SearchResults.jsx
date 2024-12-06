import { useLocation } from "react-router-dom";
import ArtistCard from "../resources/ArtistCard";
import TrackCard from "../resources/TrackCard";
import AlbumCard from "../resources/AlbumCard";
import PlaylistCardSearch from "../resources/PlaylistCardSearch";

export function SearchResults() {
    const location = useLocation();
    const { results } = location.state || { 
        results: { 
            playlists: [], 
            tracks: [], 
            albums: [], 
            artists: [], 
            related_albums: [], 
            related_tracks: [] 
        } 
    };

    const MAX_RELATED_TRACKS = 8;

    return (
        <div className="search-results min-h-screen p-4 bg-zinc-900">
            <h1 className="text-3xl font-bold mb-4">Search results</h1>
            <div className="results-container space-y-8">
                {results.artists.length > 0 && (
                    <div className="results-section">
                        <h2 className="text-2xl font-semibold mb-2">Artists</h2>
                        <div className="flex overflow-x-auto space-x-4">
                            {results.artists.map((artist) => (
                                <ArtistCard
                                    key={artist.id}
                                    id={artist.id}
                                    name={artist.name}
                                    image={artist.image}
                                />
                            ))}
                        </div>
                    </div>
                )}
                {results.related_tracks.length > 0 && (
                    <div className="results-section">
                        <h2 className="text-2xl font-semibold mb-2">Related Tracks</h2>
                        <div className="flex overflow-x-auto space-x-4">
                            {results.related_tracks.slice(0, MAX_RELATED_TRACKS).map((track) => (
                                <TrackCard
                                    key={track.id}
                                    id={track.id}
                                    name={track.title}
                                    image={track.image}
                                    artist_id={track.artist_id}
                                />
                            ))}
                        </div>
                    </div>
                )}
                {results.related_albums.length > 0 && (
                    <div className="results-section">
                        <h2 className="text-2xl font-semibold mb-2">
                        Related Albums</h2>
                        <div className="flex overflow-x-auto space-x-4">
                            {results.related_albums.map((album) => (
                                <AlbumCard
                                    key={album.id}
                                    id={album.id}
                                    name={album.title}
                                    image={album.image}
                                    artist_id={album.artist_id}
                                />
                            ))}
                        </div>
                    </div>
                )}
                {results.playlists.length > 0 && (
                    <div className="results-section">
                        <h2 className="text-2xl font-semibold mb-2">Playlists</h2>
                        <div className="flex overflow-x-auto space-x-4">
                            {results.playlists.map((playlist) => (
                                <PlaylistCardSearch
                                    key={playlist.id}
                                    id={playlist.id}
                                    name={playlist.name}
                                    image={playlist.image}
                                />
                            ))}
                        </div>
                    </div>
                )}
                {results.tracks.length > 0 && (
                    <div className="results-section">
                        <h2 className="text-2xl font-semibold mb-2">Tracks</h2>
                        <div className="flex overflow-x-auto space-x-4">
                            {results.tracks.map((track) => (
                                <TrackCard
                                    key={track.id}
                                    id={track.id}
                                    name={track.title}
                                    image={track.image}
                                    artist_id={track.artist_id}
                                    album_id={track.album_id}
                                />
                            ))}
                        </div>
                    </div>
                )}
                {results.albums.length > 0 && (
                    <div className="results-section">
                        <h2 className="text-2xl font-semibold mb-2">Álbumes</h2>
                        <div className="flex overflow-x-auto space-x-4">
                            {results.albums.map((album) => (
                                <AlbumCard
                                    key={album.id}
                                    id={album.id}
                                    name={album.title}
                                    image={album.image}
                                    artist_id={album.artist_id}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchResults;
