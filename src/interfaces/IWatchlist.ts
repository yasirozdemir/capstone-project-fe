import { IMovie } from "./IMovie";
import { IUser } from "./IUser";

export interface IWatchlist {
  _id: string;
  name: string;
  cover: string;
  members: IUser[];
  movies: string[];
  likes: string[];
  createdAt: Date;
}

export interface IWatchlistDetailed {
  _id: string;
  name: string;
  cover: string;
  members: IUser[];
  movies: IMovie[];
  likes: string[];
  createdAt: Date;
}
