import { useEffect, useState } from 'react';
import { useSongIdState } from '../contexts/SongIdContext';
import { getPlaylist } from '../services/SpotifyService';
import { Alert } from 'react-bootstrap';
import useCreatePlaylist from '../hooks/useCreatePlaylist';
import MoodList from '../components/MoodList';
import ThePlayList from '../components/ThePlayList';
import Button from '../components/Button';

const MoodPage = () => {
  const [accessToken] = useState<string | null>(localStorage.getItem('access_token'));
  const [error, setError] = useState<string | false>(false);
  const { moodForPlaylist, songIdForPlaylist, selectedMood, setPlaylist, playlist } = useSongIdState();
  const { createAndAddTracksPlaylist, error: createPlaylistError } = useCreatePlaylist(accessToken, playlist);

  const callPlaylist = async (mood: string, songIdForPlaylist: string, accessToken: string) => {
    try {
      const data = await getPlaylist(mood, songIdForPlaylist, accessToken);
      setPlaylist(data);
      console.log('Generated playlist:', data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something unexpected happened.");
      }
    }
  };

  useEffect(() => {
    console.log("UseEffectPlaylist: ", playlist);
  }, [playlist]);

  return (
    <>
      <h1>Choose your mood!</h1>
      <h3>(if the mood you choose doesn't reflect the vibe of your song, the results might be unexpected)</h3>
      <MoodList />
      {moodForPlaylist && songIdForPlaylist && accessToken && selectedMood && (
        <>
          <p>You have chosen {selectedMood}. Do you want to proceed?</p>
          <Button onClick={() => callPlaylist(moodForPlaylist, songIdForPlaylist, accessToken)} text="Proceed!" />
        </>
      )}
      {playlist && <ThePlayList playlist={playlist} />}
      {playlist && accessToken && (
        <Button onClick={() => createAndAddTracksPlaylist(selectedMood!)} text="Create and Add to Spotify Playlist" />
      )}
      {error && <Alert variant='warning'>{error}</Alert>}
      {createPlaylistError && <Alert variant='warning'>{createPlaylistError}</Alert>}
    </>
  );
};

export default MoodPage;