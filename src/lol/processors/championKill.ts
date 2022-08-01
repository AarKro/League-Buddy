import { ChampionKillEvent } from "../../api/model";
import { playVoiceLine } from "../../utils";
import { VoiceLine } from "../../voiceUrls";
import { GSS } from "../gameSessionStorage";

export const ChampionKill = async (event: ChampionKillEvent) => {
  // is killer on the same team as active player?
  if (GSS.playerList[event.KillerName].team === GSS.playerList[GSS.activePlayerName].team) {
    await playVoiceLine(VoiceLine.BOOP);
  }

  return Promise.resolve();
}