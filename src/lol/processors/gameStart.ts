import { GameStartEvent } from "../../model";
import { getVoiceLineWithTags, playVoiceLine } from "../../utils";

export const GameStart = async ({ EventName }: GameStartEvent) => {
  await playVoiceLine(getVoiceLineWithTags(EventName));

  return Promise.resolve();
}