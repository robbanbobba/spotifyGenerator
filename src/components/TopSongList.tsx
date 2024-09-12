import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSongIdState } from "../contexts/SongIdContext";
import { SingleSong } from "../services/SpotifyService.types";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import useNavigation from "../hooks/useNavigation";
import Button from "./Button";

interface TopSongListProps {
  TopSongs: SingleSong[];
}

const TopSongList: React.FC<TopSongListProps> = ({ TopSongs }) => {
  const [songMessage, setSongMessage] = useState<null | string>(null)
  const { setSongIdForPlaylist } = useSongIdState()
  const { navigateTo } = useNavigation()
  const bottomRef = useRef<HTMLDivElement>(null);

  const dealWithChoice = (song: SingleSong) => {
    setSongIdForPlaylist(song.id)
    setSongMessage(`You have chosen ${song.name} with ${song.artist}. Do you wish to proceed?`)
  }

  useEffect(() => {
    if (songMessage) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [songMessage])

  return (
    <>
      <ListGroup>
        {TopSongs.map((song) => (
          <ListGroupItem className="clickList" key={song.id} onClick={() => dealWithChoice(song)}>{song.name} - {song.artist}</ListGroupItem>
        ))}
      </ListGroup>
      {songMessage && <><p>{songMessage}</p>
        <Button onClick={() => navigateTo('/mood')} text="Go to next page!" />
      </>}
      <div ref={bottomRef}></div> 
    </>
  );
};

export default TopSongList;
