import IUser from "./IUser";

export interface IPeer {
  userId: number;
  user: IUser;
  peerId: number;
  peer: IUser;
}
