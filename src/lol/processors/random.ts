import { RandomEvent } from "../../model";
import { getVoiceLineWithTags, playVoiceLine } from "../../utils";

export const Random = async ({ EventName }: RandomEvent) => {
  await playVoiceLine(getVoiceLineWithTags(EventName));

  return Promise.resolve();
}