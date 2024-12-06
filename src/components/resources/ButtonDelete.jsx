import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteIcon } from './Icons';
import { DeleteType } from '../Api';

const ButtonDelete = ({ id, type }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        const confirmDelete = window.confirm(`Are you sure you want to delete this ${type}?`);
        if (confirmDelete) {
            try {
                await DeleteType(id, type);
                console.log(`Deleted ${type} with ID: ${id}`);
                navigate('/');
            } catch (error) {
                console.error(`Error deleting ${type} with ID: ${id}`, error);
            }
        }
    };

    return (
        <button onClick={handleDelete}>
            <DeleteIcon />
        </button>
    );
};

export default ButtonDelete;