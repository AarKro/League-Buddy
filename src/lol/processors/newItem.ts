import { NewItemEvent } from "../../model";
import { getVoiceLineWithTags, playVoiceLine } from "../../utils";

export const NewItem = async ({ item, player, EventName }: NewItemEvent) => {
  // play champion specific voice line if there is one, else play general voice line
  const itemChampionVoiceLine = getVoiceLineWithTags(EventName, item.itemID, player.championName)
  if (itemChampionVoiceLine) {
    await playVoiceLine(itemChampionVoiceLine);
  } else {
    const itemVoiceLine = getVoiceLineWithTags(EventName, item.itemID);
    if (itemVoiceLine) {
      await playVoiceLine(itemVoiceLine);
    }
  }

  return Promise.resolve();
}