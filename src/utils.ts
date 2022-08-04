import { createAudioResource, StreamType, entersState, AudioPlayerStatus } from "@discordjs/voice";
import { API } from "./api/api";
import { player } from "./client";
import { connectedChannelId } from "./commands/join";
import { GSS } from "./lol/gameSessionStorage";
import { VoiceLine, VoiceLineTags } from "./voiceLineConfig";

export const playVoiceLine = (audioFileUrl: string) => {
  if (!connectedChannelId || !audioFileUrl) return Promise.resolve();

  console.log(audioFileUrl);

  if (process.argv[2] === "test") return Promise.resolve();

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
  if (!GSS.playerList[summonerName]) console.warn(`checking summoner team but summoner ${summonerName} isn't in GSS | ${GSS.playerList[summonerName]}`);
  if (!GSS.playerList[GSS.activePlayerName]) console.warn(`checking summoner team but active summoner ${GSS.activePlayerName} isn't in GSS | ${GSS.playerList[GSS.activePlayerName]}`);

  return GSS.playerList[summonerName]?.team === GSS.playerList[GSS.activePlayerName]?.team
}

export const getVoiceLineWithTags = (...tags: VoiceLineTags[]) => {
  const voiceLineKeys = (Object.keys(VoiceLine) as Array<keyof typeof VoiceLine>).filter((key) => VoiceLine[key].tags.every((tag) => tags.includes(tag)));

  if (!voiceLineKeys.length) return "";
  
  return VoiceLine[voiceLineKeys[Math.floor(Math.random() * voiceLineKeys.length)]].path;
}

function* idGenerator() {
  let index = 0;
  while (true) {
    yield index++;
  }
}

export const IDGenerator = idGenerator();

export const saveActivePlayerNameToGSS = async () => {
  const activePlayerName = await API.getActivePlayerName();
  GSS.activePlayerName = activePlayerName;
}