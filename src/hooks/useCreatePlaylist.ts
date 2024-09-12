import { useState } from 'react';
import { getUserId, createPlaylist, addTracksToPlaylist } from '../services/SpotifyService';
import { PlayList, OriginalSingleSong } from '../services/SpotifyService.types';

const useCreatePlaylist = (accessToken: string | null, playlist: PlayList | null) => {
  const [error, setError] = useState<string | null>(null);

  const createAndAddTracksPlaylist = async (selectedMood: string) => {
    try {
      if (accessToken && playlist) {
        const userId = await getUserId(accessToken);
        console.log('User ID:', userId);
        const newPlaylist = await createPlaylist(userId, `Mood Playlist - ${selectedMood}`, accessToken);
        console.log('Created playlist:', newPlaylist);
        const trackUris = playlist.tracks.map((track: OriginalSingleSong) => track.uri);
        console.log('Track URIs:', trackUris);
        await addTracksToPlaylist(newPlaylist.id, trackUris, accessToken);
        alert('Playlist created successfully!');

        setTimeout(() => {
          window.location.href = `spotify:playlist:${newPlaylist.id}`;
        }, 3000);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something unexpected happened.");
      }
    }
  };

  return { createAndAddTracksPlaylist, error };
};

export default useCreatePlaylist;