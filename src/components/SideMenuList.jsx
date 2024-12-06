import {ArtistIcon, TrackIcon, PlaylistIcon, AlbumIcon} from './resources/Icons';
import SideMenuItem from './resources/SideMenuItem';


export function SideMenuList() {

    return (
        <ul className="flex flex-col gap-2">
            <SideMenuItem key="artists" href="music/add-artist" children={<><ArtistIcon /> Add Artists</>} />
            <SideMenuItem key="albums" href="music/add-album" children={<><AlbumIcon /> Add Albums</>} />
            <SideMenuItem key="tracks" href="music/add-track" children={<><TrackIcon /> Add Tracks</>} />
            <SideMenuItem key="playlists" href="music/add-playlist" children={<><PlaylistIcon /> Add Playlists</>} />
        </ul>
    );
}