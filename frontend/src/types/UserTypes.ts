export type user = {
  username: string;
  userId: string;
  profilePicture?: string;
};
export type seenByUser = {
  userId: string;
  username: string;
  profilePicture: string;
  time?: Date;
};
