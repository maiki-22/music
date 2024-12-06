import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { GetArtistById } from "../Api";

const AlbumCard = React.memo(({ id, name, image, artist_id }) => {
    const [artistName, setArtistName] = useState('');

    useEffect(() => {
        async function fetchArtistName() {
            try {
                const name = await GetArtistById(artist_id);
                setArtistName(name.name);
            } catch (error) {
                console.error(error);
            }
        }
        if (artist_id) {
            fetchArtistName();
        }
    }, [artist_id]);

    return (
        <a
            href={`/album/${id}`}
            className="playlist-item transition-all duration-300 flex relative p-2 overflow-hidden gap-2 pb-6 rounded-md w-44 flex-col hover:bg-zinc-800 hover:text-red-500"
        >
            <picture className="w-full h-auto flex-none">
                <img
                    src={image}
                    className="object-cover size-35 rounded-md aspect-square"
                    alt={name}
                />
            </picture>

            <div className="flex flex-auto flex-col truncate">
                <h4 className="font-semibold">{name}</h4>
            </div>

            <span className="text-xs text-zinc-500">{artistName || ''}</span>
        </a>
    );
});

AlbumCard.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    artist_id: PropTypes.number.isRequired,
};

export default AlbumCard;
