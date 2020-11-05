import * as functions from 'firebase-functions';
import { firestore } from './config';

import { Game, UpdateUsername, FirstArgument } from './types';

import { randomCode } from './utils';

export const createDocForUser = functions.auth.user().onCreate(async (user) => {
  await firestore
    .doc(`/users/${user.uid}`)
    .set({ uid: user.uid, id: user.uid, name: user.displayName || 'New user' });
});

export const updateUsername = functions.https.onCall(
  async (data: FirstArgument<UpdateUsername>, context) => {
    const uid = context.auth?.uid;
    if (!uid) return;

    await firestore.doc(`/users/${uid}`).set({ uid, name: data.name });
  }
);

export const createGame = functions.https.onCall(async (data, context) => {
  const code = randomCode();

  const creatorUid = context.auth?.uid;

  if (!creatorUid) return 'No uid in context';

  const userDoc = await firestore.doc(`/users/${creatorUid}`).get();
  const user = userDoc.data();

  if (!user) return 'User not found';

  try {
    const newGame: Game = {
      code,
      creatorUid,
      players: [{ uid: creatorUid, name: user.name }],
    };

    await firestore.doc(`/games/${code}`).set(newGame);

    return code;
  } catch (e) {
    functions.logger.error(e);
    return e.toString();
  }
});
