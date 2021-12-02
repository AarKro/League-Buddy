import { playVoiceFile } from "../utils";
import { voiceResponsesById } from "./voiceCommandConfig";

let moodScore: number = Number(process.argv[2]) === 0 ? Number(process.argv[2]) :  Number(process.argv[2]) || 50;

const modifyMoodScore = (value: number) => {
  moodScore += value;

  if (moodScore > 99) moodScore = 99;
  else if (moodScore < 0) moodScore = 0;
}

export const processMatch = (id: number) => {
  modifyMoodScore(voiceResponsesById[id].moodModifier);
  console.log('current mood: ' + moodScore);

  const moodLevel = Math.floor((moodScore / 2) / 10);
  playVoiceFile(voiceResponsesById[id].responses[moodLevel]);
}