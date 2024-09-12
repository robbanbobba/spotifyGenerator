import React, { createContext, useContext, useState, ReactNode, FC } from 'react';
import { PlayList } from '../services/SpotifyService.types';

// Define the shape of the context value
interface SongIdContextType {
    songIdForPlaylist: string | null;
    setSongIdForPlaylist: React.Dispatch<React.SetStateAction<string | null>>;
    moodForPlaylist: string | null;
    setMoodForPlaylist: React.Dispatch<React.SetStateAction<string | null>>;
    setSelectedMood: React.Dispatch<React.SetStateAction<string | null>>;
    selectedMood: string | null;
    setPlaylist: React.Dispatch<React.SetStateAction<PlayList | null>>;
    playlist: PlayList | null;
}

// Create the context with a default value
const SongIdContext = createContext<SongIdContextType | undefined>(undefined);

interface MyStateProviderProps {
    children: ReactNode;
}

// Define the provider component
export const MyStateProvider: FC<MyStateProviderProps> = ({ children }) => {
    const [songIdForPlaylist, setSongIdForPlaylist] = useState<string | null>(null);
    const [moodForPlaylist, setMoodForPlaylist] = useState<string | null>(null)
    const [selectedMood, setSelectedMood] = useState<string | null>(null);
    const [playlist, setPlaylist] = useState<PlayList | null>(null);

    // Return the context provider with the value and children
    return (
        <SongIdContext.Provider value={{ songIdForPlaylist, setSongIdForPlaylist, moodForPlaylist, setMoodForPlaylist, setSelectedMood, selectedMood, playlist, setPlaylist }}>
            {children}
        </SongIdContext.Provider>
    );
};

// Custom hook to use the SongIdContext
export const useSongIdState = (): SongIdContextType => {
    const context = useContext(SongIdContext);
    if (!context) {
        throw new Error('useSongIdState must be used within a MyStateProvider');
    }
    return context;
};
