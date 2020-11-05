import * as functions from 'firebase-functions';
import { firestore } from './config';

import { FirstArgument, Game, JoinGame, CreateGame, ExtractReturn } from './types';

import { randomCode } from './utils';

export const createGame = functions.https.onCall(
  async (data: FirstArgument<CreateGame>, context): ExtractReturn<CreateGame> => {
    const code = randomCode();

    const creatorUid = context.auth?.uid;

    if (!creatorUid) return 'No uid in context';

    try {
      const newGame: Game = {
        code,
        creatorUid,
        players: [{ uid: creatorUid, name: data.username }],
      };

      await firestore.doc(`/games/${code}`).set(newGame);

      return { code };
    } catch (e) {
      functions.logger.error(e);
      return e.toString();
    }
  }
);

export const joinGame = functions.https.onCall(
  async (data: FirstArgument<JoinGame>, context): ExtractReturn<JoinGame> => {
    const uid = context.auth?.uid;

    if (!uid) return 'No uid in context';
    if (!data.code) return 'No cod provided';

    const gameDoc = firestore.doc(`/games/${data.code}`);
    const gameData = (await gameDoc.get()).data() as Game;

    if (!gameData) return 'Invalid code';

    if (!gameData.players.find((pl) => pl.uid === uid))
      await gameDoc.set({ players: [...gameData.players, { uid, name: data.username }] });

    return true;
  }
);
