import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStore } from "../interfaces/IStore";
import { IUser } from "../interfaces/IUser";

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
    refreshToken: "",
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
  },
});
