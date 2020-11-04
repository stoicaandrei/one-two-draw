import * as functions from 'firebase-functions';
import { firestore } from './config';

import { Game } from './types';

import { randomCode } from './utils';

const resp = {
  error: (error: string) => ({ error }),
  data: (data = {}) => ({ data }),
};

export const createGame = functions.https.onCall(async (data, context) => {
  const code = randomCode();

  if (!context.auth?.uid) return resp.error('No uid in context');

  try {
    const newGame: Game = {
      code,
      creatorUid: context.auth.uid,
      playerUids: [],
    };

    await firestore.doc(`/games/${code}`).set(newGame);

    return resp.data({ code });
  } catch (e) {
    functions.logger.error(e);
    return resp.error(e.toString());
  }
});
