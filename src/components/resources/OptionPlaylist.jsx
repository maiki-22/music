import React, { useState, useEffect } from 'react';
import { GetPlaylist, PostPlaylistTrack } from '../Api';

const OptionPlaylist = ({ trackId }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const fetchedPlaylists = await GetPlaylist();
                setPlaylists(fetchedPlaylists);
            } catch (error) {
                console.error("Error al obtener las playlists:", error);
            }
        };

        fetchPlaylists();
    }, []);

    const handleButtonClick = () => {
        setShowMenu(!showMenu);
    };

    const handleAddToPlaylist = async (playlistId) => {
        try {
            await PostPlaylistTrack(playlistId, trackId);
            setShowMenu(false);
            setSuccessMessage('Track added to playlist successfully!');
            setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
        } catch (error) {
            console.error("Error al agregar la canción a la playlist:", error);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={handleButtonClick}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Add to Playlist
            </button>
            {showMenu && (
                <div className="absolute mt-2 w-48 bg-white shadow-lg rounded">
                    {playlists.map((playlist) => (
                        <div
                            key={playlist.id}
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleAddToPlaylist(playlist.id)}
                        >
                            {playlist.name}
                        </div>
                    ))}
                </div>
            )}
            {successMessage && (
                <div className="mt-2 text-green-500">
                    {successMessage}
                </div>
            )}
        </div>
    );
};

export default OptionPlaylist;