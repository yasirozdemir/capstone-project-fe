import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStore } from "../interfaces/IStore";
import { IUser } from "../interfaces/IUser";

export const initialState: IStore = {
  tokens: {
    spotifyAT: "",
  },
  user: {
    fullName: "",
    email: "",
    avatar: "",
    refreshToken: "",
    playlists: [],
  },
  users: [],
};

export const slicedStore = createSlice({
  name: "store",
  initialState,
  reducers: {
    // sets logged in user details
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    // set all the users in the DB
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },
    // sets Spotify access token
    setSpotifyAT: (state, action: PayloadAction<string>) => {
      state.tokens.spotifyAT = action.payload;
    },
  },
});
