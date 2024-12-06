import { useEffect, useState } from "react";
import { GetPlaylistTracks, GetAlbumById } from "../Api";

export const PlaylistTable = ({ id }) => {
    const [tracks, setTracks] = useState([]);
    const [album, setAlbums] = useState({});
    useEffect(() => {
        const fetchTracks = async () => {
            const response = await GetPlaylistTracks(id);
            setTracks(response.tracks);

            if (response.tracks.length > 0) {
                const albumId = response.tracks[0].album_id;
                if (albumId) {
                    const dataAlbum = await GetAlbumById(albumId);
                    setAlbums(dataAlbum);
                }
            }
        };
        fetchTracks();
    }, [id]);

    return (
        <table className="table-auto text-left min-w-full divide-y divide-gray-500/20">
            <thead className="">
                <tr className="text-zinc-400 text-sm">
                    <th className="px-4 py-2 font-light">#</th>
                    <th className="px-4 py-2 font-light">Title</th>
                    <th className="px-4 py-2 font-light">Album</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(tracks) &&
                    tracks.map((track, index) => (
                        <tr
                            key={track.id}
                            className="text-gray-300 border-spacing-0 text-sm font-light hover:bg-white/10 overflow-hidden transition duration-300 group"
                        >
                            <td className="relative px-4 py-2 rounded-tl-lg rounded-bl-lg w-5">
                                <span className="absolute top-5 opacity-100 transition-all group-hover:opacity-0">
                                    {index + 1}
                                </span>
                                <div className="absolute top-5 opacity-0 transition-all group-hover:opacity-100">
                                    {index + 1}
                                </div>
                            </td>
                            <td className="px-4 py-2 flex items-center gap-3 ">
                                <picture className="">
                                    <img
                                        src={track.image}
                                        alt={track.title}
                                        className="w-11 h-11"
                                    />
                                </picture>
                                <div className="flex flex-col font-medium text-white">
                                    <h3>{track.title}</h3>
                                    <span className="text-white/60 text-xs">{track.artistName}</span>
                                </div>
                            </td>
                            <td className="px-4 py-2">
                                {track.album_id ? (
                                    <a
                                        href={`/album/${track.album_id}`}
                                        className="text-zinc-600 hover:underline hover:text-red-500"
                                    >
                                        {album.title}
                                    </a>
                                ) : (
                                    <a
                                        href={`/track/${track.id}`}
                                        className="text-zinc-600 hover:underline hover:text-red-500"
                                    >
                                        {track.title}
                                    </a>
                                )}
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
};

export default PlaylistTable;