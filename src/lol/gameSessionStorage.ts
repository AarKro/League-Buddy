import { Champion, LoLEvent } from "../api/model"

interface GameSessionStorage {
  queue: LoLEvent[],
  lastQueueIndex: number,
  playerList: {[k: string]: Champion}; // player list by summoner name
  activePlayerName: string;
}

// this is meant to be a game session based global storage.
// will be cleard on gamestart to make sure no data from another game is carried over
export const GSS: GameSessionStorage = {
  queue: [],
  lastQueueIndex: 0,
  playerList: {},
  activePlayerName: "",
}

export const clearGameSessionStorage = () => {
  //GSS.queue = []; We dont clear the queue, because it clears itself, kinda. Also we dont want to accidentally remove unprocessed events which are suppsoed to be processed but werent yet cause its async 
  GSS.lastQueueIndex = 0;
  GSS.playerList = {};
  GSS.activePlayerName = "";
}