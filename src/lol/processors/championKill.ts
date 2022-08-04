import { ChampionKillEvent } from "../../model";
import { getVoiceLineWithTags, isSummonerOnSameTeam, playVoiceLine } from "../../utils";
import { VoiceLineTag } from "../../voiceLineConfig";
import { GSS } from "../gameSessionStorage";

export const ChampionKill = async ({ KillerName, VictimName, EventName}: ChampionKillEvent) => {
  if (isSummonerOnSameTeam(KillerName)) {
    await playVoiceLine(getVoiceLineWithTags(EventName, VoiceLineTag.SAME_TEAM));
  } else {
    const championSpecificVoiceLine = getVoiceLineWithTags(EventName, GSS.playerList[VictimName].championName);
    if (championSpecificVoiceLine) {
      await playVoiceLine(championSpecificVoiceLine);
    } else {
      await playVoiceLine(getVoiceLineWithTags(EventName));
    }
  }

  return Promise.resolve();
}