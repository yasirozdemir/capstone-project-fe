import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { setSpotifyAT } from "../../redux/actions";

const AI = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSpotifyAT());
  }, [dispatch]);
  return <>HELO</>;
};

export default AI;
