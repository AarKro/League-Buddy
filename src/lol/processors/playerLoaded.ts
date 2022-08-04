import { LoLChampion, LoLPosition, PlayerLoadedEvent } from "../../model";
import { playVoiceLine } from "../../utils";

const championRoleToVoiceLine: {[k in LoLPosition]?: {[k in LoLChampion]?: string}} = {
  [LoLPosition.TOP]: {
    [LoLChampion.VAYNE]: "",
    [LoLChampion.TEEMO]: "",
    [LoLChampion.TRYNDAMERE]: "",
    [LoLChampion.YONE]: "",
    [LoLChampion.YASUO]: "",
  },
  [LoLPosition.JUNGLE]: {
    [LoLChampion.MASTERYI]: "",
  },
  [LoLPosition.MIDDLE]: {
    [LoLChampion.YONE]: "",
    [LoLChampion.YASUO]: "",
    [LoLChampion.AURELIONSOL]: "",
  },
  [LoLPosition.BOTTOM]: {
    [LoLChampion.SAMIRA]: "",
  },
  [LoLPosition.SUPPORT]: {
    [LoLChampion.YUUMI]: "",
  },
}

export const PlayerLoaded = async ({ player }: PlayerLoadedEvent) => {
  const championRoleVoiceLine = championRoleToVoiceLine[player.position]?.[player.championName];
  if (championRoleVoiceLine) {
    await playVoiceLine(championRoleVoiceLine);
  }
  
  return Promise.resolve();
}