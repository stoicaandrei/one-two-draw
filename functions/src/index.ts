import * as functions from 'firebase-functions';
import { firestore } from './config';

import { Game } from './types';

import { randomCode } from './utils';

export const createGame = functions.https.onCall(async (data, context) => {
  const code = randomCode();

  const creatorUid = context.auth?.uid;

  if (!creatorUid) return 'No uid in context';

  try {
    const newGame: Game = {
      code,
      creatorUid,
      playerUids: [creatorUid],
    };

    await firestore.doc(`/games/${code}`).set(newGame);

    return { code };
  } catch (e) {
    functions.logger.error(e);
    return e.toString();
  }
});
