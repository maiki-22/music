import React, { useState, useEffect } from "react";
import { PostTrack, GetArtists, GetAlbums } from "../Api"; 
import { Toaster, toast } from "sonner";

export function AddTrack() {
    const [track, setTrack] = useState({
        title: "",
        image: "",
        artist_id: "",
        album_id: "",
    });
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchArtistsAndAlbums = async () => {
            try {
                const artistsData = await GetArtists();
                setArtists(artistsData);
                const albumsData = await GetAlbums();
                setAlbums(albumsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchArtistsAndAlbums();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTrack({
            ...track,
            [name]: name === "artist_id" ? Number(value) : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = {
            ...track,
            album_id: track.album_id === "" ? null : parseInt(track.album_id, 10),
        };

        try {
            const newTrack = await PostTrack(dataToSend);
            console.log("Track agregado:", newTrack);
            toast.success("Track added successfully");
        } catch (error) {
            if (error.response) {
                console.error("Error del servidor:", error.response.data);
                toast.error(`Error: ${error.response.data.message || "Error al agregar track"}`);
            } else if (error.request) {
                console.error("No se recibió respuesta del servidor:", error.request);
                toast.error("No response received from the server.");
            } else {
                console.error("Error en la solicitud:", error.message);
                toast.error("Error in the request.");
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="bg-zinc-300 bg-opacity-10 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md">
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 mb-6">
                        <div>
                            <label
                                htmlFor="title"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="block w-full transition duration-300 h-12 p-2 ps-7 text-sm rounded-lg bg-zinc-900 hover:bg-zinc-800 focus:hover:bg-zinc-800 cursor-pointer focus:cursor-text placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Track Title"
                                value={track.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="image"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Image URL
                            </label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                className="block w-full transition duration-300 h-12 p-2 ps-7 text-sm rounded-lg bg-zinc-900 hover:bg-zinc-800 focus:hover:bg-zinc-800 cursor-pointer focus:cursor-text placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Image URL"
                                value={track.image}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="artist_id"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Artist
                            </label>
                            <select
                                id="artist_id"
                                name="artist_id"
                                className="block w-full transition duration-300 h-12 p-2 ps-7 text-sm rounded-lg bg-zinc-900 hover:bg-zinc-800 focus:hover:bg-zinc-800 cursor-pointer focus:cursor-text placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                value={track.artist_id}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select an artist</option>
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
                                Album
                            </label>
                            <select
                                id="album_id"
                                name="album_id"
                                className="block w-full transition duration-300 h-12 p-2 ps-7 text-sm rounded-lg bg-zinc-900 hover:bg-zinc-800 focus:hover:bg-zinc-800 cursor-pointer focus:cursor-text placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                value={track.album_id}
                                onChange={handleChange}
                            >
                                
                                {albums.map((album) => (
                                    <option key={album.id} value={album.id}>
                                        {album.title}
                                    </option>
                                ))}
                                <option value="" >None</option>
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

export default AddTrack;
