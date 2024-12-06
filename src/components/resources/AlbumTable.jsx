import AlbumCard from "./AlbumCard";
import { GetArtistAlbums } from "../Api";
import { useEffect, useState } from "react";

export const AlbumTable = ({id}) => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await GetArtistAlbums(id);
        setAlbums(response.albums);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAlbums();
  }, [id]);

  return (
    <section
      id="popular-Album-container"
      className="relative transition-all duration-1000 p-2"
    >
      <div className="flex flex-wrap mt-6">
        {albums.map((album) => (
          <AlbumCard
            key={album.id}
            name={album.title}
            image={album.image}
            id={album.id}
            artist_id={Number(id)}
          />
        ))}
      </div>
    </section>
  );
};
