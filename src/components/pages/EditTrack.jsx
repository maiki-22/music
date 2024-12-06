import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetTrackById, PutTrack, GetArtists, GetAlbums } from "../Api";
import { Toaster, toast } from "sonner";
import Loader from "../resources/Loader";

export function EditTrack() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [track, setTrack] = useState({
        title: "",
        image: "",
        artist_id: "",
        album_id: "",
    });
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrackAndArtists = async () => {
            try {
                const fetchedTrack = await GetTrackById(id);
                setTrack({
                    title: fetchedTrack.title || "",
                    image: fetchedTrack.image || "",
                    artist_id: fetchedTrack.artist_id ? String(fetchedTrack.artist_id) : "",
                    album_id: fetchedTrack.album_id ? String(fetchedTrack.album_id) : "",
                });

                const artistsData = await GetArtists();
                setArtists(artistsData);

                const albumsData = await GetAlbums();
                setAlbums(albumsData);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Error al obtener datos");
                setLoading(false);
            }
        };

        fetchTrackAndArtists();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTrack({
            ...track,
            [name]: name === "artist_id" || name === "album_id" ? Number(value) || "" : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!track.title || !track.image || !track.artist_id) {
            toast.error("Por favor, completa todos los campos requeridos.");
            return;
        }

        const dataToSend = {
            ...track,
            album_id: track.album_id === "" ? "" : track.album_id,
        };

        console.log("Datos a enviar:", dataToSend);

        try {
            await PutTrack(id, dataToSend);
            toast.success("Pista actualizada exitosamente");
        } catch (error) {
            if (error.response) {
                console.error("Error del servidor:", error.response.data);
                toast.error(`Error: ${error.response.data.message || "Error al actualizar track"}`);
            } else if (error.request) {
                console.error("No se recibió respuesta del servidor:", error.request);
                toast.error("No se recibió respuesta del servidor.");
            } else {
                console.error("Error en la solicitud:", error.message);
                toast.error("Error en la solicitud.");
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader />
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-zinc-300 bg-opacity-10 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md">
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 mb-6">
                        <div>
                            <label
                                htmlFor="title"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Título
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={track.title}
                                onChange={handleChange}
                                required
                                className="block w-full transition duration-300 h-12 p-2 ps-7 text-sm rounded-lg bg-zinc-900 hover:bg-zinc-800 focus:hover:bg-zinc-800 cursor-pointer focus:cursor-text placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="image"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Imagen
                            </label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                value={track.image}
                                onChange={handleChange}
                                required
                                className="block w-full transition duration-300 h-12 p-2 ps-7 text-sm rounded-lg bg-zinc-900 hover:bg-zinc-800 focus:hover:bg-zinc-800 cursor-pointer focus:cursor-text placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="URL de la imagen"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="artist_id"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Artista
                            </label>
                            <select
                                id="artist_id"
                                name="artist_id"
                                value={track.artist_id}
                                onChange={handleChange}
                                required
                                className="block w-full mb-4 transition duration-300 h-12 p-2 ps-7 text-sm rounded-lg bg-zinc-900 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                <option value="" disabled>Selecciona un artista</option>
                                {artists.map((artist) => (
                                    <option key={artist.id} value={artist.id}>
                                        {artist.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="album_id"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Álbum
                            </label>
                            <select
                                id="album_id"
                                name="album_id"
                                value={track.album_id}
                                onChange={handleChange}
                                className="block w-full mb-4 transition duration-300 h-12 p-2 ps-7 text-sm rounded-lg bg-zinc-900 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                <option value="">None</option>
                                {albums.map((album) => (
                                    <option key={album.id} value={album.id}>
                                        {album.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="text-white transition duration-300 bg-red-500 hover:bg-red-950 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                    >
                        Submit
                    </button>
                </form>
            </div>
            <Toaster />
        </div>
    );
}

export default EditTrack;
