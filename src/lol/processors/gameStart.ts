import { GameStartEvent } from "../../api/model";
import { getVoiceLineWithTags, playVoiceLine } from "../../utils";
import { VoiceLineTag } from "../../voiceLineConfig";

export const GameStart = async (event: GameStartEvent) => {
  await playVoiceLine(getVoiceLineWithTags(VoiceLineTag.GAME_START));

  return Promise.resolve();
}