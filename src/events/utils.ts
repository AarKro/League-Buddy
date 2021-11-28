import { createAudioResource, StreamType, entersState, AudioPlayerStatus } from "@discordjs/voice";
import { player } from "../client";

export const playVoiceFile = (audioFileUrl: string) => {
  const resource = createAudioResource(audioFileUrl, {
    inputType: StreamType.Arbitrary,
  });

  player.play(resource);

  return entersState(player, AudioPlayerStatus.Playing, 5e3);
}