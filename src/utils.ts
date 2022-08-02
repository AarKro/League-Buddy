import { createAudioResource, StreamType, entersState, AudioPlayerStatus } from "@discordjs/voice";
import { player } from "./client";
import { connectedChannelId } from "./commands/join";
import { GSS } from "./lol/gameSessionStorage";
import { VoiceLine, VoiceLineTag } from "./voiceLineConfig";

export const playVoiceLine = (audioFileUrl: string) => {
  if (!connectedChannelId) return Promise.resolve();

  const resource = createAudioResource(audioFileUrl, {
    inputType: StreamType.Arbitrary,
  });
  
  player.play(resource);
  
  entersState(player, AudioPlayerStatus.Playing, 5e3);

  // return Promise which resolves when player is idle again
  return new Promise<void>((resolve) => {
    const id = setInterval(() => {
      if (player.state.status === AudioPlayerStatus.Idle) {
        resolve();
        clearInterval(id);
      }
    }, 200)
  })
}

export const noop = () => {};

export const isSummonerOnSameTeam = (summonerName: string) => {
  return GSS.playerList[summonerName].team === GSS.playerList[GSS.activePlayerName].team
}

export const getVoiceLineWithTags = (...tags: VoiceLineTag[]) => {
  const voiceLineKeys = (Object.keys(VoiceLine) as Array<keyof typeof VoiceLine>).filter((key) => VoiceLine[key].tags.some((tag) => tags.includes(tag)));

  return VoiceLine[voiceLineKeys[Math.floor(Math.random() * voiceLineKeys.length)]].path;
}