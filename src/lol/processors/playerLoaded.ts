import { PlayerLoadedEvent } from "../../model";
import { getVoiceLineWithTags, playVoiceLine } from "../../utils";

export const PlayerLoaded = async ({ player, EventName}: PlayerLoadedEvent) => {
  const positionChampionVoiceLine = getVoiceLineWithTags(EventName, player.position, player.championName);;
  if (positionChampionVoiceLine) {
    await playVoiceLine(positionChampionVoiceLine);
  }

  return Promise.resolve();
}