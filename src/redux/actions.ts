import { Dispatch } from "redux";
import { slicedStore } from "./slices";

export const setSpotifyAT = () => {
  return async (dispatch: Dispatch) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body:
          "grant_type=client_credentials&client_id=" +
          process.env.REACT_APP_SPOTIFY_CLIENT_ID +
          "&client_secret=" +
          process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
      };
      const res = await fetch(
        "https://accounts.spotify.com/api/token",
        options
      );
      if (res.ok) {
        const { access_token } = await res.json();
        dispatch({
          type: slicedStore.actions.setSpotifyAT,
          payload: access_token,
        });
      } else {
        console.log("SPOTIFY ACCESS ERROR");
      }
    } catch (error) {
      console.error(error);
    }
  };
};
