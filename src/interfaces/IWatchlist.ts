import { IMovie } from "./IMovie";
import { IUser } from "./IUser";

export interface IWatchlist {
  _id: string;
  name: string;
  cover: string;
  members: IUser[];
  movies: IMovie[];
  likes: IUser[];
}
