import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { GetArtistById } from "../Api";
const artistCache = {};
import { Link } from 'react-router-dom';
const TrackCard = React.memo(({ id, name, image, artist_id,album_id }) => {
    const [artistName, setArtistName] = useState('');

    const fetchArtistName = useMemo(() => {
        return async () => {
            if (artistCache[artist_id]) {
                setArtistName(artistCache[artist_id]);
            } else {
                const artist = await GetArtistById(artist_id);
                artistCache[artist_id] = artist.name;
                setArtistName(artist.name);
            }
        };
    }, [artist_id]);

    useEffect(() => {
        fetchArtistName();
    }, [fetchArtistName]);

    
    const url = album_id ? `/album/${album_id}` : `/track/${id}`;

    return (
        <Link
            to={url}
            className="playlist-item transition-all duration-300 flex relative p-2 overflow-hidden gap-2 pb-6 rounded-md w-44 flex-col hover:bg-zinc-800 hover:text-red-500"
        >
            <picture className="w-full h-auto flex-none">
                <img
                    src={image}
                    className="object-cover size-35 rounded-md aspect-square"
                />
            </picture>

            <div className="flex flex-auto flex-col truncate">
                <h4 className="font-semibold">{name}</h4>
            </div>

            <span className="text-xs text-zinc-500">{artistName}</span>
        </Link>
    );
});

TrackCard.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    artist_id: PropTypes.number.isRequired,
};

export default TrackCard;