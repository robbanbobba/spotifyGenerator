import React from "react";
import { useSongIdState } from "../contexts/SongIdContext";
import { ListGroup, ListGroupItem } from "react-bootstrap";


const MoodList: React.FC = () => {
  const { setMoodForPlaylist, setSelectedMood } = useSongIdState()

  const dealWithMood = (moodUri: string, mood: string) => {
    setMoodForPlaylist(moodUri);
    setSelectedMood(mood);
  };

  return (
    <>
      <ListGroup>
        <ListGroupItem className="clickList" onClick={() => dealWithMood("&target_energy=0.4&min_energy=0.2&max_energy=0.5&min_tempo=65&max_tempo=120&target_tempo=80&target_valence=0.7", "Chill")}>Chill</ListGroupItem>
        <ListGroupItem className="clickList" onClick={() => dealWithMood("&target_mode=1&min_energy=0.4&max_energy=1&max_valence=1&min_valence=0.6", "Happy")}>Happy</ListGroupItem>
        <ListGroupItem className="clickList" onClick={() => dealWithMood("&target_mode=0&max_energy=0.4&min_energy=0&max_valence=0.5&min_valence=0", "Sad")}>Sad</ListGroupItem>
        <ListGroupItem className="clickList" onClick={() => dealWithMood("&min_danceability=0.8&max_danceability=1.0&target_danceability=1&min_energy=0.6&max_energy=1.0&min_valence=0.5&max_valence=1.0", "Dance")}>Dance</ListGroupItem>
        <ListGroupItem className="clickList" onClick={() => dealWithMood("&target_energy=1&min_energy=0.8&max_energy=1&min_tempo=120&max_tempo=160", "Workout")}>Workout</ListGroupItem>
      </ListGroup>
    </>
  );
};

export default MoodList;
