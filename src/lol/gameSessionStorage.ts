import { Champion } from "../api/model"

interface GameSessionStorage {
  playerList: {[k: string]: Champion}; // player list by summoner name
  activePlayerName: string;
}

// this is meant to be a game session based global storage.
// will be cleard on gamestart to make sure no data from another game is carried over
export const GSS: GameSessionStorage = {
  playerList: {},
  activePlayerName: "",
}

export const clearGameSessionStorage = () => {
  GSS.playerList = {};
  GSS.activePlayerName = "";
}