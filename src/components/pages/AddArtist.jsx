import React, { useState } from "react";
import { PostArtist } from "../Api";
import { Toaster, toast } from "sonner";


export function AddArtist() {
    const [artist, setArtist] = useState({
        name: "",
        image: "",
        followers: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArtist({
            ...artist,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const newArtist = await PostArtist(artist);
            console.log("Artist added:", newArtist);
            toast.success("Artist added successfully");
        } catch (error) {
            console.error("Error al agregar el artista:", error);
            toast.error("Error adding artist");
        } finally {
            
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">

                <div className="bg-zinc-300 bg-opacity-10 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md">
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-6 mb-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-white"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="block w-full transition duration-300 h-12 p-2 ps-7 text-sm rounded-lg bg-zinc-900 hover:bg-zinc-800 focus:hover:bg-zinc-800 cursor-pointer focus:cursor-text placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="Artist Name"
                                    value={artist.name}
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
                                    value={artist.image}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="followers"
                                    className="block mb-2 text-sm font-medium  text-white"
                                >
                                    Followers
                                </label>
                                <input
                                    type="number"
                                    id="followers"
                                    name="followers"
                                    className="block w-full transition duration-300 h-12 p-2 ps-7 text-sm rounded-lg bg-zinc-900 hover:bg-zinc-800 focus:hover:bg-zinc-800 cursor-pointer focus:cursor-text placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="Number of Followers"
                                    value={artist.followers}
                                    onChange={handleChange}
                                    required
                                />
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

export default AddArtist;
