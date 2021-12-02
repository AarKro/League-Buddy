import "reflect-metadata";
import path from "path";
import { Intents, Interaction, Message } from "discord.js";
import { Client } from "discordx";
import { createAudioPlayer } from "@discordjs/voice";
import { fork } from 'child_process';
import { processMatch } from "./voice-recognition/voiceCommandHandler";

export const player = createAudioPlayer();

export const voskVoiceProcessor = fork(`${ __dirname}/voice-recognition/voskVoiceProcessor.js`, [
  `${__dirname}/assets/vosk-model-en-us-0.22-lgraph`,
  '-1'
]); 

voskVoiceProcessor.on('message', (id: number) => {
  processMatch(id);
});

voskVoiceProcessor.on("error", (err: any) => {
  console.log('error in voskVoiceProcessor')
  console.log(err);
});

voskVoiceProcessor.on("exit", (exitCode: any) => {
  console.log('voskVoiceProcessor exited')
  console.log(exitCode);
});

const client = new Client({
  simpleCommand: {
    prefix: "!",
  },
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
  classes: [
    path.join(__dirname, "commands", "**/*.{ts,js}"),
    path.join(__dirname, "events", "**/*.{ts,js}"),
  ],
  botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],
  silent: true,
});

client.once("ready", async () => {
  await client.initApplicationCommands({
    guild: { log: true },
    global: { log: true },
  });
  await client.initApplicationPermissions();

  console.log("Bot started");
});

client.on("interactionCreate", (interaction: Interaction) => {
  client.executeInteraction(interaction);
});

client.on("messageCreate", (message: Message) => {
  client.executeCommand(message);
});

client.login(process.env.BOT_TOKEN ?? ""); // provide your bot token