import Fuse from "fuse.js";

const voiceCommands = [
  {
    id: 1,
    matches: ['thanks linus', 'thank you linus', 'thank you', 'thanks'],
    voskGrammar: ['thank you', 'thanks']
  },
  {
    id: 2,
    matches: ['fuck off linus', 'shut up linus', 'no one cares linus', 'kill yourself linus', 'kys linus', 'idiot linus', 'baka linus', 'go commit die linus', 'baka'],
    voskGrammar: ['fuck off', 'shut up', 'kill yourself', 'baka', 'go commit die', 'no one cares']
  }
];

const fuzzyMatchingConfig = {
  includeScore: true,
  keys: ['matches'],
  threshold: 0.4
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