import { MultikillEvent, MultikillType } from "../../model";
import { getVoiceLineWithTags, isSummonerOnSameTeam, playVoiceLine } from "../../utils";
import { VoiceLineTag } from "../../voiceLineConfig";

// kill is at leaste a double kill, else the regular champion kill processor is called
export const Multikill = async ({ KillerName, KillStreak, EventName }: MultikillEvent) => {
  if (isSummonerOnSameTeam(KillerName)) { 
    await playVoiceLine(getVoiceLineWithTags(EventName, KillStreak));
  } else if (KillStreak === MultikillType.PENTA) {
    await playVoiceLine(getVoiceLineWithTags(EventName, KillStreak, VoiceLineTag.ENEMY_TEAM));
  }

  return Promise.resolve();
}