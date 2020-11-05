export type User = {
  uid: string;
  name: string;
};

export type Player = {
  uid: string;
  name: string;
};

export type Game = {
  code: string;
  creatorUid: string;
  players: Player[];
};

export * from './functions';
