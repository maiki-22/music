import React, { useEffect, useState } from 'react';
import { GetArtistById, PutArtist } from '../Api';
import { useParams } from 'react-router-dom';
import { Toaster, toast } from "sonner";
import Loader from '../resources/Loader';

const EditArtist = () => {
  const { id } = useParams(); // Asegúrate de obtener el ID correctamente
  const [artist, setArtist] = useState({ name: '', image: '', followers: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const fetchedArtist = await GetArtistById(id);
        setArtist(fetchedArtist);
      } catch (error) {
        console.error("Error fetching artist:", error);
        toast.error("Error fetching artist");
      } finally {
        setLoading(false); 
      }
    };

    fetchArtist();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArtist({
      ...artist,
      [name]: name === 'followers' ? parseInt(value, 10) || 0 : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, image, followers } = artist;
    console.log("ID del artista:", id);
    console.log("Datos enviados:", { name, image, followers });

    try {
      await PutArtist(id, { name, image, followers });
      toast.success("Artista actualizado exitosamente");
    } catch (error) {
      console.error("Error al actualizar el artista:", error);
      if (error.response && error.response.data && error.response.data.errors) {
        const validationErrors = error.response.data.errors;
        for (const key in validationErrors) {
          if (validationErrors.hasOwnProperty(key)) {
            toast.error(validationErrors[key][0]);
          }
        }
      } else {
        toast.error("Error actualizando el artista");
      }
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
                className="block mb-2 text-sm font-medium text-white"
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
};

export default EditArtist;
