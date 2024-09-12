import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSongIdState } from '../contexts/SongIdContext';
import { getTopTracks } from '../services/SpotifyService';
import { SingleSong, SongData } from '../services/SpotifyService.types';
import { setAccessToken } from '../services/SpotifyService';
import useToken from '../hooks/useToken';
import TopSongList from '../components/TopSongList';


interface MainPageProps {
    clientId: string;
    clientSecret: string;
}

const MainPage: React.FC<MainPageProps> = ({ clientId, clientSecret }) => {
    const [topSongs, setTopSongs] = useState<SingleSong[]>([]);
    const { songIdForPlaylist } = useSongIdState()
    const accessToken = useToken({ clientId, clientSecret });

    useEffect(() => {
        if (accessToken)
            setAccessToken(accessToken)
    }, [clientId, clientSecret]);


    const getUserTop = async () => {
        if (accessToken) {
            const data = getTopTracks(accessToken)
            console.log('Hämtat data', data);
            const songData: SongData = await data
            console.log('Hämtat sångdata', songData)
            const song: SingleSong[] = []
            songData.items.map(item => song.push({ id: item.id, name: item.name, artist: item.artists[0].name }))
            console.log("SongId: ", song)
            setTopSongs(song)
            console.log("Topsongs: ", topSongs)
        }
    }
    useEffect(() => {
        getUserTop()
    }, [accessToken])
    useEffect(() => {
        console.log("SongId: ", songIdForPlaylist)
    }, [songIdForPlaylist])


    return (
        <>
            {topSongs && (
                <>
                    <h1>Here are your top songs!</h1>
                    <h2>Choose one as inspiration for your playlist!</h2>
                    <TopSongList TopSongs={topSongs} />
                </>
            )}
        </>
    );
}

export default MainPage;