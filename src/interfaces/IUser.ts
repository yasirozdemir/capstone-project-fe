import { IPlaylist } from "./IPlayist";

export interface IUser {
  fullName: string;
  email: string;
  avatar: string;
  refreshToken: string;
  playlists: IPlaylist[];
}
