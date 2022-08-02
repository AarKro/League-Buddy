import { Champion, LoLEvent } from "../api/model"

interface GameSessionStorage {
  queue: LoLEvent[],
  lastEventDataIndex: number,
  playerList: {[k: string]: Champion}; // player list by summoner name
  activePlayerName: string;
}

// this is meant to be a game session based global storage.
// will be cleard on gamestart to make sure no data from another game is carried over
export const GSS: GameSessionStorage = {
  queue: [],
  lastEventDataIndex: 0,
  playerList: {},
  activePlayerName: "",
}

export const clearGSS = () => {
  GSS.queue = [];
  GSS.lastEventDataIndex = 0;
  GSS.playerList = {};
  GSS.activePlayerName = "";
}