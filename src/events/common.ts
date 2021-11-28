import { createAudioResource, StreamType, entersState, AudioPlayerStatus } from "@discordjs/voice";
import { Discord, On, Client, ArgsOf } from "discordx";
import { player } from "../client";
import { connectedChannelId } from "../commands/join";
import { VOICE_BOT_JOINED, VOICE_USER_JOINED, VOICE_USER_LEFT } from "../voiceUrls";
import { playVoiceFile } from "./utils";

@Discord()
export abstract class AppEvents {
  @On("voiceStateUpdate")
  onMessage([oldState, newState]: ArgsOf<"voiceStateUpdate">, client: Client) {
    if (player.state.status === AudioPlayerStatus.Idle) {
      if (newState.member?.user.id === client.user?.id && newState.channelId && oldState.channelId !== newState.channelId) {
        // bot joined the channel
        return playVoiceFile(VOICE_BOT_JOINED);
      } else if (newState.channelId === connectedChannelId && oldState.channelId !== connectedChannelId) {
        // user joined the channel
        return playVoiceFile(VOICE_USER_JOINED);
      } else if (oldState.channelId === connectedChannelId && newState.channelId !== connectedChannelId) {
        // user left the channel
        return playVoiceFile(VOICE_USER_LEFT);
      }
    }
  }
}