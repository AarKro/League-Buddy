import { GameStartEvent } from "../../model";
import { getVoiceLineWithTags, playVoiceLine } from "../../utils";
import { VoiceLineTag } from "../../voiceLineConfig";

export const GameStart = async ({ EventName }: GameStartEvent) => {
  await playVoiceLine(getVoiceLineWithTags(EventName));

  return Promise.resolve();
}