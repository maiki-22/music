import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const PlaylistCardSearch = React.memo(({ id, name, image }) => {

    return (
        <a
            href={`/album/${id}`}
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

        </a>
    );
});

PlaylistCardSearch.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
};

export default PlaylistCardSearch;