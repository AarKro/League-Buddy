import { createAudioResource, StreamType, entersState, AudioPlayerStatus } from "@discordjs/voice";
import { User } from "discord.js";
import { player } from "./client";

export const ATOM_ID = '347761171933167616';
export const ATOM_TEAMSPEAK_CHANNEL = '787069162123558922'; //'914524177137008661';

export const playVoiceFile = (audioFileUrl: string) => {
  if (player.state.status === AudioPlayerStatus.Idle) {
    const resource = createAudioResource(audioFileUrl, {
      inputType: StreamType.Arbitrary,
    });
    
    player.play(resource);
    
    return entersState(player, AudioPlayerStatus.Playing, 5e3);
  }
}
  
export const getDisplayName = (userId: string, user?: User) => {
	return user ? `${user.username}_${user.discriminator}` : userId;
}