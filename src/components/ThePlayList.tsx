import React from "react";
import { OriginalSingleSong, PlayList as PlayType } from "../services/SpotifyService.types";
import { ListGroup, ListGroupItem } from "react-bootstrap";

interface PlayListProps {
  playlist: PlayType;
}

const PlayList: React.FC<PlayListProps> = ({ playlist }) => {

  return (
    <>
      <ListGroup>
        {playlist && playlist.tracks.map((track: OriginalSingleSong) => (
          <ListGroupItem key={track.id}>{track.name} - {track.artists[0].name}</ListGroupItem>
        ))}
      </ListGroup>
    </>
  );
};

export default PlayList;
