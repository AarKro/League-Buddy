import Fuse from "fuse.js";
import { VOICE_THANK_YOU, VOICE_YAMETE } from "../voiceUrls";

const voiceCommands = [
  {
    id: 1,
    matches: ['thanks linus', 'thank you linus', 'thank you', 'thanks'],
    voskGrammar: ['thank you', 'thanks'],
    moodModifier: 5,
    voiceResponses: [
      VOICE_THANK_YOU,
      VOICE_THANK_YOU,
      VOICE_THANK_YOU,
      VOICE_THANK_YOU,
      VOICE_THANK_YOU,
    ]
  },
  {
    id: 2,
    matches: ['fuck off linus', 'shut up linus', 'no one cares linus', 'kill yourself linus', 'kys linus', 'idiot linus', 'baka linus', 'go commit die linus', 'baka', 'fuck you'],
    voskGrammar: ['fuck off', 'shut up', 'kill yourself', 'baka', 'go commit die', 'no one cares', 'fuck you'],
    moodModifier: -5,
    voiceResponses: [
      VOICE_YAMETE,
      VOICE_YAMETE,
      VOICE_YAMETE,
      VOICE_YAMETE,
      VOICE_YAMETE,
    ]
  }
];

const fuzzyMatchingConfig = {
  includeScore: true,
  keys: ['matches'],
  threshold: 0.3
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
  }, [])
));

export const voiceResponsesById: {[k: number]: { responses: string[], moodModifier: number }} = {};
voiceCommands.forEach((command) => {
  voiceResponsesById[command.id] = { 
    responses: command.voiceResponses,
    moodModifier: command.moodModifier,
  };
});