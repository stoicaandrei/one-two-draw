export type Player = {
  uid: string;
  name: string;
};

export const PENDING = 0;
export const PLAYING = 1;
export const FINISHED = 2;

export type Game = {
  code: string;
  creatorUid: string;
  players: Player[];
  state: number;
};

export * from './functions';
