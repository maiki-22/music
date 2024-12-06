import React from 'react';
import { Link } from 'react-router-dom';
import { EditIcon } from './Icons';

const ButtonEdit = ({ id, type }) => {
    return (
        <Link to={`/edit/${type}/${id}`}>
            <EditIcon />
        </Link>
    );
};

export default ButtonEdit;
