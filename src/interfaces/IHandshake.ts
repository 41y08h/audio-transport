import IUser from "./IUser";

export interface IHandshake {
  fromUserId: number;
  fromUser: IUser;
  toUserId: number;
  toUser: IUser;
  createdAt: Date;
}
