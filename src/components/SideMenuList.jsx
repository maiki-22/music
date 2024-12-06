import {ArtistIcon, TrackIcon, PlaylistIcon, AlbumIcon} from './resources/Icons';
import SideMenuItem from './resources/SideMenuItem';


export function SideMenuList() {

    return (
        <ul className="flex flex-col gap-2">
            <SideMenuItem key="artists" href="/add-artist" children={<><ArtistIcon /> Add Artists</>} />
            <SideMenuItem key="albums" href="/add-album" children={<><AlbumIcon /> Add Albums</>} />
            <SideMenuItem key="tracks" href="/add-track" children={<><TrackIcon /> Add Tracks</>} />
            <SideMenuItem key="playlists" href="/add-playlist" children={<><PlaylistIcon /> Add Playlists</>} />
        </ul>
    );
}