import { DragonKillEvent } from "../../model";
import { getVoiceLineWithTags, isSummonerOnSameTeam, playVoiceLine } from "../../utils";
import { VoiceLineTag } from "../../voiceLineConfig";

export const DragonKill = async ({ KillerName, Stolen, EventName }: DragonKillEvent) => {
  if (isSummonerOnSameTeam(KillerName)) {
    if (Stolen) {
      await playVoiceLine(getVoiceLineWithTags(EventName, VoiceLineTag.JUNGLE_KILL_STOLEN));
    } else {
      await playVoiceLine(getVoiceLineWithTags(EventName));
    }
  } else if (Stolen) {
    await playVoiceLine(getVoiceLineWithTags(EventName, VoiceLineTag.JUNGLE_KILL_STOLEN, VoiceLineTag.ENEMY_TEAM));
  }

  return Promise.resolve();
}