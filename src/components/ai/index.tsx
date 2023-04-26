import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setSpotifyAT } from "../../redux/actions";
import { ISong } from "../../interfaces/ISong";

const AI = () => {
  const dispatch = useAppDispatch();
  const spotifyAT = useAppSelector((state) => state.store.tokens.spotifyAT);

  const [songs, setSongs] = useState<ISong[]>([]);

  const songIDs: string[] = [
    "0NVxFntUSEYwPn27lX2J7r",
    "1s9xuJxhYM0LdVqksjegcg",
    "35PKfoynRpVFoAUE3D5Kc6",
    "3Tc57t9l2O8FwQZtQOvPXK",
    "3PzeZR8CqtwXmSn5AVao7J",
    "1odExI7RdWc4BT515LTAwj",
  ];

  const fetchSong = async (songID: string) => {
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${spotifyAT}`,
        },
      };
      const res = await fetch(
        "https://api.spotify.com/v1/tracks/" + songID,
        options
      );
      if (res.ok) {
        const { album, external_urls, id, name, preview_url, duration_ms } =
          await res.json();
        const song = {
          id,
          album,
          external_urls,
          name,
          preview_url,
          duration_ms,
        };
        setSongs((prevSongs) => [...prevSongs, song]);
      } else {
        console.log("ERROR FETCHING SONG");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setSongsList = async (songIDs: string[]) => {
    songIDs.forEach((id) => fetchSong(id));
  };

  useEffect(() => {
    dispatch(setSpotifyAT());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setSongsList(songIDs);
    console.log(songs);
    return () => setSongs([]);
    // eslint-disable-next-line
  }, [spotifyAT]);

  return (
    <>
      {songs?.map((song) => (
        <div key={song.id}>
          <img src={song.album?.images![1].url} alt="song" />
          <h3>{song.name}</h3>
        </div>
      ))}
    </>
  );
};

export default AI;
