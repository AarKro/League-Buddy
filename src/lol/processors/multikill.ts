import { MultikillEvent } from "../../model";
import { getVoiceLineWithTags, isSummonerOnSameTeam, playVoiceLine } from "../../utils";
import { VoiceLineTag } from "../../voiceLineConfig";

// kill is at leaste a double kill, else the regular champion kill processor is called
export const Multikill = async (event: MultikillEvent) => {
  if (isSummonerOnSameTeam(event.KillerName)) { 
    switch(event.KillStreak) {
      case 2:
        await playVoiceLine(getVoiceLineWithTags(VoiceLineTag.DOUBLE_KILL));
        break;
      case 3:
        await playVoiceLine(getVoiceLineWithTags(VoiceLineTag.TRIPPLE_KILL));
        break;
      case 4:
        await playVoiceLine(getVoiceLineWithTags(VoiceLineTag.QUADRA_KILL));
        break;
      case 5:
        await playVoiceLine(getVoiceLineWithTags(VoiceLineTag.PENTA_KILL));
        break;
      default:
        console.error("Killstreak is not between 2 and 5??")
    }
  }

  return Promise.resolve();
}