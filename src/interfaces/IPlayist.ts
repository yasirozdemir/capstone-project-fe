import { ISong } from "./ISong";
import { IUser } from "./IUser";

export interface IPlaylist {
  _id: string;
  name: string;
  cover: string;
  user: IUser;
  songs: Array<ISong>;
  likes: Array<string>;
}
