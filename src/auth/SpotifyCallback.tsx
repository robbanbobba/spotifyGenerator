import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../services/SpotifyService";

const SpotifyCallback: React.FC = () => {
  const navigate = useNavigate();

  console.log("Cookie outside useEffect: ", document.cookie)

  const clientId = "bc6e8cd87cb246ca8d71360885de2705";
  const clientSecret = "be0f49e1d9bd4fddb5c3fcf28486e71b";

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    const codeVerifier = localStorage.getItem("code_verifier");
    console.log("Cookie: ", document.cookie)


    console.log("Callback component loaded");
    console.log("Code:", code);
    console.log("Code Verifier:", codeVerifier);

    if (code && codeVerifier) {
      console.log("Trying to get access token");
      getAccessToken(code, codeVerifier, clientId, clientSecret)
        .then((response) => {
          if (response) {
            console.log("Received tokens:", response);
            localStorage.setItem("access_token", response.access_token);
            localStorage.setItem("refresh_token", response.refresh_token);  // Spara refresh_token
            console.log("Saved refresh_token: ", response.refresh_token);
            localStorage.removeItem("code_verifier");
            navigate("/main");
          }
        })
        .catch((error) => {
          console.error("Failed to get access token", error);
        });
    } else {
      console.error("No code or codeVerifier found");
    }
  }, [navigate, clientId, clientSecret]);

  return <div>LoadingBingbing...</div>;
};

export default SpotifyCallback;