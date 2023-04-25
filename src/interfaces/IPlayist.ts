import { IUser } from "./IUser";

export interface IPlaylist {
  _id: string;
  name: string;
  user: IUser;
  songs: Array<"">; // FIXME
}
