import { API } from "../../api/api";
import { GameStartEvent } from "../../api/model";
import { getVoiceLineWithTags, playVoiceLine } from "../../utils";
import { VoiceLineTag } from "../../voiceLineConfig";
import { clearGameSessionStorage, GSS } from "../gameSessionStorage";

export const GameStart = async (event: GameStartEvent) => {
  clearGameSessionStorage();
  
  const [playerList, activePlayerName] = await Promise.all([API.getPlayerData(), API.getActivePlayerName()]);

  playerList.forEach((player) => GSS.playerList[player.summonerName] = player);
  GSS.activePlayerName = activePlayerName;

  await playVoiceLine(getVoiceLineWithTags(VoiceLineTag.GAME_START));

  return Promise.resolve();
}