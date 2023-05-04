import { IWatchlist } from "./IWatchlist";

export interface IUser {
  _id: string;
  name: string;
  surname: string;
  email: string;
  avatar: string;
  verified: boolean;
  watchlists: IWatchlist[];
  likedWatchlists: IWatchlist[];
  followers: string[];
  following: string[];
  refreshToken: string;
}
