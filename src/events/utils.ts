import { createAudioResource, StreamType, entersState, AudioPlayerStatus } from "@discordjs/voice";
import { player } from "../client";

export const ATOM_ID = '347761171933167616';
export const ATOM_TEAMSPEAK_CHANNEL = '914524177137008661';

export const playVoiceFile = (audioFileUrl: string) => {
  const resource = createAudioResource(audioFileUrl, {
    inputType: StreamType.Arbitrary,
  });

  player.play(resource);

  return entersState(player, AudioPlayerStatus.Playing, 5e3);
}