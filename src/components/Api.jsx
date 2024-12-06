import axios from 'axios';

// Base URL para evitar repetir
const BASE_URL = 'https://energetic-merralee-php-api-0476cfc5.koyeb.app/api';

// Obtener mis Playlist
export const GetPlaylist = async () => {
  const response = await axios.get(`${BASE_URL}/playlist`);
  return response.data;
};

//Obtener una playlist por su id
export const GetPlaylistById = async (id) => {
  const response = await axios.get(`${BASE_URL}/playlist/${id}`);
  return response.data;
};

//Obtener las canciones de una playlist por su id
export const GetPlaylistTracks = async (id) => {
  const response = await axios.get(`${BASE_URL}/playlist/${id}/tracks`);
  return response.data;
};


//Obtener todos los Albums 




// Obtener los artistas populares
export const GetPopularArtists = async () => {
  const response = await axios.get(`${BASE_URL}/artist`);
  const topArtists = response.data
    .sort((a, b) => b.followers - a.followers)
    .slice(0, 8);
  return topArtists;
};


// Obtener Albums Aleatorios
export const GetAlbums = async () => {
  const response = await axios.get(`${BASE_URL}/album`);
  const albums = response.data;
  return albums;
};

//Obtener Albums Aleatorios
export const GetRandomAlbums = async () => {
  const response = await axios.get(`${BASE_URL}/album`);
  const albums = response.data;
  const shuffledAlbums = albums.sort(() => 0.5 - Math.random()).slice(0, 8);
  return shuffledAlbums;
};





// Obtener Tracks Aleatorios
export const GetTracks = async () => {
  const response = await axios.get(`${BASE_URL}/track`);
  const tracks = response.data;
  const shuffledTracks = tracks.sort(() => 0.5 - Math.random()).slice(0, 8);
  return shuffledTracks;
};

// Obtener todos los artistas
export const GetArtists = async () => {
  const response = await axios.get(`${BASE_URL}/artist`);
  return response.data;
};

// Obtener un artista por su ID
export const GetArtistById = async (id) => {
  const response = await axios.get(`${BASE_URL}/artist/${id}`);
  return response.data;
};


export const GetArtistTracks = async (id) => {
  const response = await axios.get(`${BASE_URL}/artist/${id}/tracks`);
  return response.data;
};


//Obtener todos los albums de un artista por id 
export const GetArtistAlbums = async (id) => {
  const response = await axios.get(`${BASE_URL}/artist/${id}/albums`);
  return response.data;
};


//Obtener un album por su id
export const GetAlbumById = async (id) => {
  const response = await axios.get(`${BASE_URL}/album/${id}`);
  return response.data;
};

//Obtener todos los tracks de un album por id
export const GetAlbumTracks = async (id) => {
  const response = await axios.get(`${BASE_URL}/album/${id}/tracks`);
  return response.data;
};


//Obtener un track por su id
export const GetTrackById = async (id) => {
  const response = await axios.get(`${BASE_URL}/track/${id}`);
  return response.data;
};


export const search = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, { params: { query } });
    console.log(response.data);
    return response.data;

  } catch (error) {
    console.error("Error al obtener los resultados de búsqueda:", error);
    throw error; 
  }
};


//Agregar un artista
export const PostArtist = async (artist) => {
  try {
    const response = await axios.post(`${BASE_URL}/artist`, artist);
    return response.data;
  } catch (error) {
    console.error("Error al agregar un artista:", error);
    throw error;
  }
};

//Agregar un album
export const PostAlbum = async (album) => {
  console.log("Enviando álbum:", album);
  try {
    const response = await axios.post(`${BASE_URL}/album`, album);
    return response.data;
  } catch (error) {
    console.error("Error en PostAlbum:", error);
    throw error;
  }
};


//Agregar un Track
export const PostTrack = async (track) => {
  try {
    const response = await axios.post(`${BASE_URL}/track`, track);
    return response.data;
  } catch (error) {
    throw error;
  }
};


//Agregar una Playlist
export const PostPlaylist = async (playlist) => {
  try {
    const response = await axios.post(`${BASE_URL}/playlist`, playlist);
    return response.data;
  } catch (error) {
    console.error("Error al agregar una playlist:", error);
    throw error;
  }
};



//Editar un Artista
export const PutArtist = async (id, artist) => {
  try {
    const response = await axios.put(`${BASE_URL}/artist/${id}`, artist);
    return response.data;
  } catch (error) {
    console.error("Error al editar un artista:", error);
    throw error;
  }
};

//Editar un Album
export const PutAlbum = async (id, album) => {
  try {
    const response = await axios.put(`${BASE_URL}/album/${id}`, album);
    return response.data;
  } catch (error) {
    console.error("Error al editar un album:", error);
    throw error;
  }
};

//Editar un Track
export const PutTrack = async (id, track) => {
  try {
    const response = await axios.put(`${BASE_URL}/track/${id}`, track);
    return response.data;
  } catch (error) {
    console.error("Error al editar un track:", error);
    throw error;
  }
};

//Editar una Playlist
export const PutPlaylist = async (id, playlist) => {
  try {
    const response = await axios.put(`${BASE_URL}/playlist/${id}`, playlist);
    return response.data;
  } catch (error) {
    console.error("Error al editar una playlist:", error);
    throw error;
  }
};
//Eliminar Artista, Album, Track, Playlist
export const DeleteType = async (id,type) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${type}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar un artista:", error);
    throw error;
  }
};

//agregar canciones a una playlist
export const PostPlaylistTrack = async (playlistId, trackId) => {
  try {
    const response = await axios.post(`${BASE_URL}/playlist/${playlistId}/tracks`, { track_id: trackId });
    return response.data;
  } catch (error) {
    console.error("Error al agregar una canción a la playlist:", error);
    throw error;
  }
};