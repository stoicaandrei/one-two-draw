export type User = {
  uid: string;
  name: string;
};

export type Game = {
  code: string;
  creatorUid: string;
  playerUids: string[];
};

export * from './functions';
