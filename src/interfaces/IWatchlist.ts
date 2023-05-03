import { IMovie } from "./IMovie";
import { IUser } from "./IUser";

export interface IWatchlist {
  name: string;
  cover: string;
  members: IUser[];
  movies: IMovie[];
  likes: IUser[];
}
