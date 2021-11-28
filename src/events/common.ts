import { createAudioResource, StreamType, entersState, AudioPlayerStatus } from "@discordjs/voice";
import { Discord, On, Client, ArgsOf } from "discordx";
import { player } from "../client";
import { connectedChannelId } from "../commands/join";

const VOICE_FILE_BASE_URL = 'https://github.com/AarKro/Apollo/raw/main/src/assets/voice/';
const VOICE_USER_JOINED = VOICE_FILE_BASE_URL + 'userjoin.mp3';
const VOICE_USER_LEFT = VOICE_FILE_BASE_URL + 'userleave.mp3';

@Discord()
export abstract class AppEvents {
  @On("voiceStateUpdate")
  onMessage([oldState, newState]: ArgsOf<"voiceStateUpdate">, client: Client) {
    if (player.state.status === AudioPlayerStatus.Idle) {
      if (newState.channelId && newState.channelId === connectedChannelId && oldState.channelId !== connectedChannelId) {
        const resource = createAudioResource(VOICE_USER_JOINED, {
          inputType: StreamType.Arbitrary,
        });
  
        player.play(resource);
  
        return entersState(player, AudioPlayerStatus.Playing, 5e3);
      } else if (oldState.channelId === connectedChannelId && newState.channelId !== connectedChannelId) {
        const resource = createAudioResource(VOICE_USER_LEFT, {
          inputType: StreamType.Arbitrary,
        });
  
        player.play(resource);
  
        return entersState(player, AudioPlayerStatus.Playing, 5e3);
      }
    }
  }
}