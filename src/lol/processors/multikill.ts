import { MultikillEvent } from "../../api/model";
import { playVoiceLine } from "../../utils";
import { VoiceLine } from "../../voiceUrls";
import { GSS } from "../gameSessionStorage";

export const Multikill = async (event: MultikillEvent) => {
  // is killer on the same team as active player?
  if (GSS.playerList[event.KillerName].team === GSS.playerList[GSS.activePlayerName].team) { 
    for (let i = 0; i < event.KillStreak; i++) {
      await playVoiceLine(VoiceLine.BOOP);
    }
  }

  return Promise.resolve();
}