import { useEffect, useState } from "react";
const { REACT_APP_SPOTIFY_CLIENT_ID, REACT_APP_SPOTIFY_CLIENT_SECRET } =
  process.env;

const AI = () => {
  const [spotifyAT, setSpotifyAT] = useState("");

  const getSpotifyAccessToken = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        REACT_APP_SPOTIFY_CLIENT_ID +
        "&client_secret=" +
        REACT_APP_SPOTIFY_CLIENT_SECRET,
    };

    try {
      const res = await fetch(
        "https://accounts.spotify.com/api/token",
        options
      );
      if (res.ok) {
        const { access_token } = await res.json();
        setSpotifyAT(access_token);
        console.log(access_token);
      } else {
        console.log("SPOTIFY ACCESS ERROR");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSpotifyAccessToken();
  }, []);
  return <>HELO</>;
};

export default AI;
