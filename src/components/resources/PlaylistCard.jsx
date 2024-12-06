import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const PlaylistCard = React.memo(({ id, image, name }) => {
    return (
        <Link
            to={`/playlist/${id}`}
            className="playlist-card flex text-zinc-600 relative p-2 overflow-hidden items-center gap-5 font-medium hover:text-red-500 hover:bg-zinc-800 transition duration-300 cursor-pointer rounded-lg"
        >
            <picture className="size-12 flex-none">
                <img src={image} className="object-cover w-full h-full rounded-md" alt={name} />
            </picture>

            <div className="flex flex-auto flex-col truncate">
                <h4 className="font-semibold">{name}</h4>
            </div>
        </Link>
    );
});

PlaylistCard.propTypes = {
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default PlaylistCard;
