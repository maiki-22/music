import React, { useEffect, useState } from 'react';
import { GetPopularArtists, GetRandomAlbums, GetTracks } from "../Api";
import ArtistCard from "../resources/ArtistCard";
import AlbumCard from "../resources/AlbumCard";
import TrackCard from "../resources/TrackCard";
import Loader from "../resources/Loader";

export function Home() {
    const [tracks, setTracks] = useState([]);
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const tracksData = await GetTracks();
            const artistsData = await GetPopularArtists();
            const albumsData = await GetRandomAlbums();

            setTracks(tracksData);
            setArtists(artistsData);
            setAlbums(albumsData);
            setLoading(false);
        }

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader />
            </div>
        );
    }

    return (
        <>
            <section
                id="Tracks-container"
                className="relative transition-all duration-1000 bg-zinc-900 p-2"
            >
                <div className="relative z-10 px-6 pt-10">
                    <h2 className="text-3xl font-bold">Popular Songs</h2>
                </div>
                <div className="flex flex-wrap mt-6">
                    {tracks.map((track) => (
                        <TrackCard
                            key={track.id}
                            name={track.title}
                            image={track.image}
                            id={track.id}
                            artist_id={track.artist_id}
                            album_id={track.album_id}
                        />
                    ))}
                </div>
            </section>

            <section
                id="popular-artist-container"
                className="relative transition-all duration-1000 bg-zinc-900 p-2"
            >
                <div className="relative z-10 px-6 pt-10">
                    <h2 className="text-3xl font-bold">Popular Artists</h2>
                </div>
                <div className="flex flex-wrap mt-6">
                    {artists.map((artist) => (
                        <ArtistCard
                            key={artist.id}
                            name={artist.name}
                            image={artist.image}
                            id={artist.id}
                        />
                    ))}
                </div>
            </section>

            <section
                id="popular-Album-container"
                className="relative transition-all duration-1000 bg-zinc-900 p-2"
            >
                <div className="relative z-10 px-6 pt-10">
                    <h2 className="text-3xl font-bold">Popular Albums</h2>
                </div>
                <div className="flex flex-wrap mt-6">
                    {albums.map((album) => (
                        <AlbumCard
                            key={album.id}
                            name={album.title}
                            image={album.image}
                            id={album.id}
                            artist_id={album.artist_id}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}

export default Home;
