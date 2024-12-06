import { useEffect, useState } from "react";
import { GetAlbumTracks } from "../Api";

export const AlbumTrackTable = ({ id, artistName }) => {
  
    const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await GetAlbumTracks(id);
        if (response.tracks) {
          setTracks(response.tracks);
          console.log(response.tracks);
        } else {
          console.error("Tracks not found in the response");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTracks();
  }, [id]);

  return (
    <table className="table-auto text-left min-w-full divide-y divide-gray-500/20">
      <thead className="">
        <tr className="text-zinc-400 text-sm">
          <th className="px-4 py-2 font-light">#</th>
          <th className="px-4 py-2 font-light">Title</th>
          <th className="px-4 py-2 font-light"></th>
        </tr>
      </thead>
      <tbody>
          {Array.isArray(tracks) &&
            tracks.map((track, index) => (
              <tr
                key={track.id}
                className="text-gray-300 border-spacing-0 text-sm font-light hover:bg-white/10 overflow-hidden transition duration-300 group"
              >
                <td className="relative px-4 py-2 rounded-tl-lg rounded-bl-lg w-5">
                  <span className="absolute top-5 opacity-100 transition-all group-hover:opacity-0">
                    {index + 1}
                  </span>
                  <div className="absolute top-5 opacity-0 transition-all group-hover:opacity-100">
                    {index + 1}
                  </div>
                </td>
                <td className="px-4 py-2 flex items-center gap-3 ">
                  <picture className="">
                    <img
                      src={track.image}
                      alt={track.title}
                      className="w-11 h-11"
                    />
                  </picture>
                  <div className="flex flex-col font-medium text-white">
                    <h3>{track.title}</h3>
                    <span className="text-white/60 text-xs">{artistName}</span>
                  </div>
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  );
};
