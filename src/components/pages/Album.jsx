import { GetAlbumById, GetArtistById } from "../Api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FastAverageColor } from 'fast-average-color';
import Loader from "../resources/Loader";
import { AlbumTrackTable } from "../resources/AlbumTrackTable";
import ButtonEdit from "../resources/ButtonEdit";
import ButtonDelete from "../resources/ButtonDelete";
export function Album() {
    const { id } = useParams();
    const [album, setAlbums] = useState(null);
    const [dominantColor, setDominantColor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [artist, setArtist] = useState(null);
    
    useEffect(() => {
        const fetchAlbum = async () => {
            setLoading(true);
            const data = await GetAlbumById(id);
            setAlbums(data);

            const artistData = await GetArtistById(data.artist_id);
            setArtist(artistData);

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
        fetchAlbum();
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
                    : 'none',
                backgroundSize: 'cover', // tamano del grad
                backgroundPosition: 'top', // pos del grad
            }}
        >
            <header className="flex flex-row gap-8 px-6 mt-12 items-center">
                <picture className="aspect-square size-60 flex-none">
                    <img
                        src={album?.image}
                        alt={album?.title}
                        className="object-cover size-full rounded-lg drop-shadow-xl"
                    />
                </picture>

                <div className="flex flex-col justify-center">
                    <h2 className="text-8xl font-bold text-white mb-8">
                        {album?.title}
                    </h2>
                    <span className="flex items-center gap-2">
                        <picture className="size-9">
                            <img
                                src={artist?.image}
                                alt={artist?.name}
                                className="object-cover w-full h-full rounded-full"
                            />
                        </picture>
                        <a
                        href={`/artist/${artist?.id}`}
                        ><h2
                        className="font-medium hover:underline hover:text-red-500"
                        >
                            {artist?.name}</h2></a>
                        <h2
                        className="text-white/60 font-medium"
                        >
                            • {album?.total_tracks} songs</h2>
                    </span>
                </div>

                <div className="absolute top-0 right-0 p-8 flex flex-col gap-4">
                    <ButtonEdit id={id} type="album" />
                    <ButtonDelete id={id} type="album" />
                </div>
            </header>

            <section className="p-6">
                <AlbumTrackTable id={id} artistName={artist?.name} />
            </section>

            <section>
            </section>
        </div>
    );
}

export default Album;