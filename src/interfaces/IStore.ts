import { IMovie } from "./IMovie";
import { IUser } from "./IUser";

export interface IStore {
  user: IUser;
  movies: IMovie[];
}
