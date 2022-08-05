import { ChampionKillEvent } from "../../model";
import { getVoiceLineWithTags, isKillerAPlayer, isSummonerOnSameTeam, playVoiceLine } from "../../utils";
import { VoiceLineTag } from "../../voiceLineConfig";
import { GSS } from "../gameSessionStorage";

export const ChampionKill = async ({ KillerName, VictimName, EventName}: ChampionKillEvent) => {
  if (isKillerAPlayer(KillerName)) {
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
  } else {
    if (isSummonerOnSameTeam(VictimName)) {
      await playVoiceLine(getVoiceLineWithTags(EventName, VoiceLineTag.SAME_TEAM, VoiceLineTag.EXECUTED));
    } else {
      await playVoiceLine(getVoiceLineWithTags(EventName, VoiceLineTag.EXECUTED));
    }
  }

  return Promise.resolve();
}