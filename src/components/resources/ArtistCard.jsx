



import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const ArtistCard = React.memo(({ id, name, image }) => {
    return (
        <Link
            to={`/artist/${id}`}
            className="playlist-item transition-all duration-300 flex relative p-2 overflow-hidden gap-2 pb-6 rounded-md w-44 flex-col hover:bg-zinc-800 hover:text-red-500"
        >
            <picture className="w-full h-auto flex-none">
                <img
                    src={image}
                    className="object-cover size-35 rounded-full aspect-square"
                />
            </picture>

            <div className="flex flex-auto flex-col">
                <h4 className="font-semibold">{name}</h4>
            </div>

            <span className="text-xs text-zinc-500">Artista</span>
        </Link>
    );
});

ArtistCard.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
};

export default ArtistCard;
