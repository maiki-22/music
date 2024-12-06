import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetAlbumById, PutAlbum, GetArtists } from "../Api";
import { Toaster, toast } from "sonner";
import Loader from "../resources/Loader";

export function EditAlbum() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [album, setAlbum] = useState({
        title: "",
        image: "",
        total_tracks: 0,
        artist_id: 0,
    });
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const fetchedAlbum = await GetAlbumById(id);
                setAlbum(fetchedAlbum);
            } catch (error) {
                console.error("Error fetching album:", error);
                toast.error("Error fetching album");
            } finally {
                setLoading(false);
            }
        };

        const fetchArtists = async () => {
            try {
                const artistsData = await GetArtists();
                setArtists(artistsData);
            } catch (error) {
                console.error("Error fetching artists:", error);
            }
        };

        fetchAlbum();
        fetchArtists();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAlbum({
            ...album,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await PutAlbum(id, album);
            toast.success("Album updated successfully");
        } catch (error) {
            console.error("Error updating album:", error);
            toast.error("Error updating album");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader />
            </div>
        );
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
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="block w-full transition duration-300 h-12 p-2 ps-7 text-sm rounded-lg bg-zinc-900 hover:bg-zinc-800 focus:hover:bg-zinc-800 cursor-pointer focus:cursor-text placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Album Title"
                                value={album.title}
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
                                value={album.image}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="total_tracks"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Total Tracks
                            </label>
                            <input
                                type="number"
                                id="total_tracks"
                                name="total_tracks"
                                className="block w-full transition duration-300 h-12 p-2 ps-7 text-sm rounded-lg bg-zinc-900 hover:bg-zinc-800 focus:hover:bg-zinc-800 cursor-pointer focus:cursor-text placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Number of Tracks"
                                value={album.total_tracks}
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
                                value={album.artist_id}
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

export default EditAlbum;