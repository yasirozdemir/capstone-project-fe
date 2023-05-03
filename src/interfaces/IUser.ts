import { IWatchlist } from "./IWatchlist";

export interface IUser {
  name: string;
  surname: string;
  email: string;
  avatar: string;
  verified: boolean;
  watchlists: IWatchlist[];
  likedWatchlists: IWatchlist[];
  followers: IUser[];
  following: IUser[];
  refreshToken: string;
}
