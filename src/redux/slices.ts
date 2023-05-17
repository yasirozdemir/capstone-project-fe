import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStore } from "../interfaces/IStore";
import { IUser } from "../interfaces/IUser";
import { IMovie } from "../interfaces/IMovie";

export const initialState: IStore = {
  user: {
    _id: "",
    name: "",
    surname: "",
    email: "",
    avatar: "",
    verified: false,
    watchlists: [],
    likedWatchlists: [],
    followers: [],
    following: [],
  },
  movies: [],
};

export const slicedStore = createSlice({
  name: "store",
  initialState,
  reducers: {
    // sets logged in user details
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    // set AI suggestions
    setMoviesRedux: (state, action: PayloadAction<IMovie[]>) => {
      state.movies = action.payload;
    },
  },
});
