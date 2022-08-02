import { API } from "../../api/api";
import { GameStartEvent } from "../../api/model";
import { getVoiceLineWithTags, playVoiceLine } from "../../utils";
import { VoiceLineTag } from "../../voiceLineConfig";
import { clearGameSessionStorage, GSS } from "../gameSessionStorage";

export const GameStart = async (event: GameStartEvent) => {
  clearGameSessionStorage();
  
  const activePlayerName = await API.getActivePlayerName();
  GSS.activePlayerName = activePlayerName;

  await playVoiceLine(getVoiceLineWithTags(VoiceLineTag.GAME_START));

  return Promise.resolve();
}