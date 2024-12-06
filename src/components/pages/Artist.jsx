import { GetArtistById } from "../Api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MusicTable } from "../resources/MusicTable";
import { FastAverageColor } from "fast-average-color";
import Loader from "../resources/Loader";
import { AlbumTable } from "../resources/AlbumTable";
import ButtonEdit from "../resources/ButtonEdit"; // Importa el ButtonEdit
import ButtonDelete from "../resources/ButtonDelete";

export function Artist() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [dominantColor, setDominantColor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtist = async () => {
      setLoading(true);
      const data = await GetArtistById(id);
      setArtist(data);

      // Obtener el color promedio de la imagen del artista
      const fac = new FastAverageColor();
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = data.image;
      // en caso de que el CORS no de acceso buuuu
      img.onload = () => {
        try {
          const color = fac.getColor(img);
          setDominantColor(color.rgb);
        } catch (error) {
          setDominantColor("rgb(250, 128, 114)"); //
        }
        setLoading(false);
      };
      img.onerror = () => {
        setDominantColor("rgb(250, 128, 114)");
        setLoading(false);
      };
    };
    fetchArtist();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div
      className="relative flex flex-col h-full bg-zinc-900 overflow-x-hidden transition-opacity duration-500"
      style={{
        backgroundImage: dominantColor
          ? `linear-gradient(to bottom, ${dominantColor}, transparent 70%)`
          : "none",
        backgroundSize: "cover", // tamano del grad
        backgroundPosition: "top", // pos del grad
      }}
    >
      <header className="relative flex flex-row gap-8 px-6 mt-12 items-center">
        <picture className="aspect-square size-60 flex-none">
          <img
            src={artist?.image}
            alt={artist?.name}
            className="object-cover size-full rounded-full"
          />
        </picture>

        <div className="flex flex-col justify-center">
          <h2 className="text-8xl font-bold text-white mb-8">{artist?.name}</h2>
          <p className="text-xl text-white/80 font-medium">
            {artist?.followers?.toLocaleString()} followers
          </p>
        </div>

        <div className="absolute top-0 right-0 p-8 flex flex-col gap-4">
          <ButtonEdit id={id} type="artist" />
          <ButtonDelete id={id} type="artist" />
        </div>
      </header>

      <div className="relative z-10 px-6 pt-10 text-3xl font-bold">Popular</div>

      <section className="p-6">
        <MusicTable id={id} artistName={artist?.name} />
      </section>

      <div className="relative z-10 px-6 pt-10 text-3xl font-bold">
        Discography
      </div>

      <section>
        <AlbumTable id={id} />
      </section>
    </div>
  );
}

export default Artist;
