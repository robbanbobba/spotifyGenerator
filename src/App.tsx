import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SpotifyAuth from "./auth/SpotifyAuth";
import SpotifyCallback from "./auth/SpotifyCallback";
import { setAccessToken } from "./services/SpotifyService";
import MainPage from "./pages/MainPage";
import MoodPage from "./pages/MoodPage";
import { MyStateProvider } from "./contexts/SongIdContext";
import "./assets/App.scss"

const clientId = 'bc6e8cd87cb246ca8d71360885de2705';
const clientSecret = 'be0f49e1d9bd4fddb5c3fcf28486e71b';

const App: React.FC = () => {
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  return (
    <MyStateProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SpotifyAuth />} />
          <Route path="/callback" element={<SpotifyCallback />} />
          <Route path="/main" element={<MainPage clientId={clientId} clientSecret={clientSecret} />} />
          <Route path="/mood" element={<MoodPage />} />
        </Routes>
      </Router>
    </ MyStateProvider>
  );
};

export default App;