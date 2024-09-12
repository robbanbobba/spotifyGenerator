import React, { useEffect } from "react";
import { generateCodeVerifier, generateCodeChallenge } from "./pkce";
import Button from "../components/Button";

const SpotifyAuth: React.FC = () => {
  const clientId = "bc6e8cd87cb246ca8d71360885de2705";
  const redirectUri = "https://spotifylistgenerator.netlify.app/callback";
  const scopes = [
    "user-read-private",
    "user-read-email",
    "user-top-read",
    "playlist-read-private",
    "playlist-modify-public",
    "playlist-modify-private",
  ];

  const handleLogin = async () => {
    try {
      localStorage.removeItem("code_verifier")
      const codeVerifier = generateCodeVerifier();
      document.cookie = `codeVerifier=${codeVerifier}`
      console.log("Generated Code Verifier:", codeVerifier);
      localStorage.setItem("code_verifier", codeVerifier);
      const storageVerifier = localStorage.getItem("code_verifier")
      console.log("Verifier from localStorage", storageVerifier)
      console.log("Cookie: ", document.cookie)

      const codeChallenge = await generateCodeChallenge(codeVerifier);
      console.log("Generated Code Challenge:", codeChallenge);

      const state = Math.random().toString(36).substring(7);
      console.log("Generated State:", state);

      const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scopes.join(
        "%20"
      )}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

      console.log("Authorization URL:", url);
      window.location.href = url;
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  useEffect(() => {
    console.log("Auth logging");
  }, []);

  return (
    <div className="startPage">
      <h1>Create Your Playlistinjoo!!!</h1>
      <Button onClick={handleLogin} text='Login with Spotify' />
    </div>
  );
};

export default SpotifyAuth;