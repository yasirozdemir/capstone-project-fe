import { IUser } from "./IUser";

export interface IStore {
  tokens: {
    spotifyAT: string;
  };
  user: IUser;
  users: IUser[];
}
