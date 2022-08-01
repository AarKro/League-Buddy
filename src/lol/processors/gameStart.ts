import { API } from "../../api/api";
import { GameStartEvent } from "../../api/model";
import { clearGameSessionStorage, GSS } from "../gameSessionStorage";

export const GameStart = async (event: GameStartEvent) => {
  clearGameSessionStorage();
  
  const [playerList, activePlayerName] = await Promise.all([API.getPlayerData(), API.getActivePlayerName()]);

  playerList.forEach((player) => GSS.playerList[player.summonerName] = player);
  GSS.activePlayerName = activePlayerName;

  return Promise.resolve();
}