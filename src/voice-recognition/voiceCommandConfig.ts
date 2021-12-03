import Fuse from "fuse.js";
import { VOICE_FUCK_0, VOICE_FUCK_1, VOICE_FUCK_2, VOICE_FUCK_3, VOICE_FUCK_4, VOICE_THANKS_0, VOICE_THANKS_1, VOICE_THANKS_2, VOICE_THANKS_3, VOICE_THANKS_4 } from "../voiceUrls";

const voiceCommands = [
  {
    id: 1,
    matches: ['thanks linus', 'thank you linus', 'thank you', 'thanks'],
    voskGrammar: ['thank you', 'thanks'],
    moodModifier: 5,
    voiceResponses: [
      VOICE_THANKS_0,
      VOICE_THANKS_1,
      VOICE_THANKS_2,
      VOICE_THANKS_3,
      VOICE_THANKS_4,
    ]
  },
  {
    id: 2,
    matches: ['fuck off linus', 'shut up linus', 'no one cares linus', 'kill yourself linus', 'idiot linus', 'baka linus', 'go commit die linus', 'baka', 'fuck you linus'],
    voskGrammar: ['fuck off', 'shut up', 'kill yourself', 'baka', 'go commit die', 'no one cares', 'fuck you'],
    moodModifier: -5,
    voiceResponses: [
      VOICE_FUCK_0,
      VOICE_FUCK_1,
      VOICE_FUCK_2,
      VOICE_FUCK_3,
      VOICE_FUCK_4,
    ]
  }
];

const fuzzyMatchingConfig = {
  includeScore: true,
  keys: ['matches'],
  threshold: 0.2,
};

const fuzzyMatchingMatches = voiceCommands.map((command) => ({
  id: command.id,
  matches: command.matches
}));

export const fuzzyMatcher = new Fuse(
  fuzzyMatchingMatches,
  fuzzyMatchingConfig
);

export const voskGrammar = Array.from(new Set(voiceCommands
  .map((command) => command.voskGrammar)
  .reduce((acc, curr) => {
    return acc = [...acc, ...curr];
  }, ['linus'])
));

export const voiceResponsesById: {[k: number]: { responses: string[], moodModifier: number }} = {};
voiceCommands.forEach((command) => {
  voiceResponsesById[command.id] = { 
    responses: command.voiceResponses,
    moodModifier: command.moodModifier,
  };
});