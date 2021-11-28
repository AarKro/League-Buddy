import { entersState, joinVoiceChannel, VoiceConnectionStatus } from "@discordjs/voice";
import { CommandInteraction, VoiceChannel } from "discord.js";
import { Discord, Slash } from "discordx";
import { createDiscordJSAdapter } from "../adapters";
import { player } from "../client";

// TODO: refactor this so its not accessed as a global variable
export let connectedChannelId: string = '';
export const setConnectedChannelId = (value: string) => connectedChannelId = value;

@Discord()
abstract class Join {
  @Slash("join")
  private async join(
    interaction: CommandInteraction
  ) {
    if (interaction.guildId && interaction.member) {
      const guild = interaction.client.guilds.cache.get(interaction.guildId);

      if (guild) {
        const member = guild.members.cache.get(interaction.member.user.id);

        if (member) {
          const voiceChannel = member.voice.channel;

          if (voiceChannel && voiceChannel.joinable && voiceChannel instanceof VoiceChannel) {
            const voiceConnection = joinVoiceChannel({
              channelId: voiceChannel.id,
              guildId: guild.id,
              adapterCreator: createDiscordJSAdapter(voiceChannel)
            });

            try {
              await entersState(voiceConnection, VoiceConnectionStatus.Ready, 30e3);
              
              voiceConnection.subscribe(player);
              setConnectedChannelId(voiceChannel.id);
              
              interaction.reply('joined voice channel !');

              return;
            } catch (error) {
              voiceConnection.destroy();
            }
          }
        }
      }
    }

    interaction.reply('joining voice channel failed :(');
  }
}
