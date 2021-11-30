import { AudioPlayerStatus, entersState, joinVoiceChannel, VoiceConnectionStatus } from "@discordjs/voice";
import { VoiceChannel } from "discord.js";
import { Discord, On, Client, ArgsOf } from "discordx";
import { createDiscordJSAdapter } from "../adapters";
import { player } from "../client";
import { connectedChannelId, setConnectedChannelId } from "../commands/join";
import { createListeningStream } from "../voice-recognition/createListeningStream";
import { VOICE_USER_JOINED, VOICE_USER_LEFT, VOICE_WELCOME } from "../voiceUrls";
import { ATOM_ID, ATOM_TEAMSPEAK_CHANNEL, playVoiceFile } from "./utils";

let listenMode = false;
export const setListenMode = (value: boolean) => listenMode = value;

@Discord()
export abstract class AppEvents {
  @On("voiceStateUpdate")
  async onMessage([oldState, newState]: ArgsOf<"voiceStateUpdate">, client: Client) {
    if (player.state.status === AudioPlayerStatus.Idle) {
      const isBot = newState.member?.user.id === client.user?.id;
      
      if (isBot && newState.channelId && oldState.channelId !== newState.channelId) {
        // bot joined the channel
        return playVoiceFile(VOICE_WELCOME);
      } else if (isBot && !newState.channelId && oldState.channelId) {
        // bot disconnected
        setConnectedChannelId('');
        return;
      } else if (newState.channelId === connectedChannelId && oldState.channelId !== connectedChannelId) {
        // user joined the channel
        return playVoiceFile(VOICE_USER_JOINED);
      } else if (oldState.channelId === connectedChannelId && newState.channelId !== connectedChannelId) {
        // user left the channel
        return playVoiceFile(VOICE_USER_LEFT);
      }

      if (newState.channelId === ATOM_TEAMSPEAK_CHANNEL && connectedChannelId === '') {
        // join bot to teamspeak channel instead of announcing user joined
        const voiceChannel = client.channels.cache.get(ATOM_TEAMSPEAK_CHANNEL);
  
        if (voiceChannel && voiceChannel.isVoice()) {
          const voiceConnection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: ATOM_ID,
            adapterCreator: createDiscordJSAdapter(voiceChannel as VoiceChannel),
            selfDeaf: false,
          });
  
          try {
            await entersState(voiceConnection, VoiceConnectionStatus.Ready, 30e3);
            setConnectedChannelId(voiceChannel.id);
            
            voiceConnection.subscribe(player);

            const receiver = voiceConnection.receiver;
            receiver.speaking.on('start', (userId) => {
              if (listenMode && player.state.status === AudioPlayerStatus.Idle) {
                createListeningStream(receiver, userId, client.users.cache.get(userId));
              }
            });
            
            return playVoiceFile(VOICE_WELCOME);
          } catch (error) {
            voiceConnection.destroy();
          }
        }
      }
    }
  }
}

let lockListenMode = false;

player.on('stateChange', (oldState, newState) => {
  if (!lockListenMode && oldState.status === AudioPlayerStatus.Playing && newState.status === AudioPlayerStatus.Idle) {
    // listen for a few secs to respond to thanks
    setListenMode(true);
    setTimeout(() => {
      setListenMode(false);
      lockListenMode = true;
      setTimeout(() => lockListenMode = false, 5000);
    }, 2000);
  }
});