import { ChampionKillEvent } from "../../model";
import { getVoiceLineWithTags, isSummonerOnSameTeam, playVoiceLine } from "../../utils";
import { VoiceLine, VoiceLineTag } from "../../voiceLineConfig";

export const ChampionKill = async (event: ChampionKillEvent) => {
  if (isSummonerOnSameTeam(event.KillerName)) {
    await playVoiceLine(getVoiceLineWithTags(VoiceLineTag.CHAMPION_KILL));
  }

  return Promise.resolve();
}