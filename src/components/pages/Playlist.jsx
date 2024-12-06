import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FastAverageColor } from 'fast-average-color';
import Loader from "../resources/Loader";
import ButtonEdit from "../resources/ButtonEdit";
import ButtonDelete from "../resources/ButtonDelete";
import EditPlaylist from "./EditPlaylist";
import { GetPlaylistById } from "../Api";
import PlaylistTable from "../resources/PlaylistTable";

export function Playlist() {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [dominantColor, setDominantColor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    
    useEffect(() => {
        const fetchPlaylist = async () => {
            setLoading(true);
            const data = await GetPlaylistById(id);
            setPlaylist(data);

            // Obtener el color promedio de la imagen del album
            const fac = new FastAverageColor();
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = data.image;
            img.onload = () => {
                const color = fac.getColor(img);
                setDominantColor(color.rgb);
                setLoading(false);
            };
        };
        fetchPlaylist();
    }, [id]);

    const openEditModal = () => {
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader />
            </div>
        );
    }

    return (
        <div 
            className={`relative flex flex-col h-full overflow-x-hidden transition-opacity duration-500 ${isEditModalOpen ? 'filter blur-sm' : ''}`}
            style={{ background: `linear-gradient(180deg, ${dominantColor} 0%, #000 100%)` }}
        >
            <header className="flex flex-row gap-8 px-6 mt-12 items-center">
                <picture className="aspect-square size-60 flex-none">
                    <img
                        src={playlist?.image}
                        alt={playlist?.name}
                        className="object-cover size-full rounded-lg drop-shadow-xl"
                    />
                </picture>

                <div className="flex flex-col justify-center">
                    <h2 className="text-8xl font-bold text-white mb-8">
                        {playlist?.name}
                    </h2>
                </div>
                <div className="absolute top-0 right-0 p-8 flex flex-col gap-4">
                    <ButtonEdit id={id} type="playlist"  />
                    <ButtonDelete id={id} type="playlist" />
                </div>
            </header>

            <section className="p-6">
                <PlaylistTable id={id} />
            </section>

            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                        <EditPlaylist />
                        <button onClick={closeEditModal} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Playlist;