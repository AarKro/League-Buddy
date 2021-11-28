import { createAudioResource, StreamType, entersState, AudioPlayerStatus } from "@discordjs/voice";
import { Discord, On, Client, ArgsOf } from "discordx";
import { player } from "../client";

const VOICE_USER_JOINED = '../assets/voice/userjoinn.mp3';
const VOICE_USER_LEFT = '../assets/voice/userleave.mp3';

@Discord()
export abstract class AppEvents {
  @On("voiceStateUpdate")
  onMessage([oldState, newState]: ArgsOf<"voiceStateUpdate">, client: Client) {
    if (newState.channelId) {
      const resource = createAudioResource('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', {
        inputType: StreamType.Arbitrary,
      });

      player.play(resource);

      return entersState(player, AudioPlayerStatus.Playing, 5e3);
    } else {
      const resource = createAudioResource(VOICE_USER_LEFT, {
        inputType: StreamType.Arbitrary,
      });

      player.play(resource);

      return entersState(player, AudioPlayerStatus.Playing, 5e3);
    }
  }
}