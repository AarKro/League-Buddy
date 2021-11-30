import Fuse from 'fuse.js';
const { logLevel, loadModel, transcriptFromFile } = require('@solyarisoftware/voskjs');

interface VoskResult {
  text: string;
  result: {
    conf: number;
    end: number;
    start: number;
    word: string;
  }[];
};

const model = loadModel(__dirname + '/../assets/vosk-model-en-us-0.22-lgraph');
const fuse = new Fuse(
  [
    {
      id: 1,
      minChars: 5,
      command: ['thanks linus', 'thank you linus', 'and carolinas', 'thank you linas', 'thanks leanest', 'thank you leanest', 'thank you', 'thanks', 'thank you landlords'],
    },
    {
      id: 2,
      minChars: 5,
      command: ['fuck off linus', 'shut up linus', 'no one cares linus', 'kill yourself linus', 'kys linus', 'shadap linus', 'idiot linus', 'baka linus', 'baaka linus', 'go commit die linus', 'fuck off leanest', 'shutup leanest', 'k y s leanest'],
    },
  ],
  { 
    includeScore: true,
    keys: ['command'],
    threshold: 0.6
  },
);

export const processVoice = async (filename: string, log = -1) => {
  logLevel(log);
  
  try {
    const result: VoskResult = await transcriptFromFile(filename, model)
    const match = fuse.search(result.text);
    
    if (match.length) {
      let bestMatch = match[0];
      for (const item of match) {
        bestMatch = (item.score || 1) < (bestMatch.score || 1) ? item : bestMatch;
      }
      
      console.log('--------------------------------------');
      console.log(result.text);
      console.log(bestMatch);
      console.log('--------------------------------------');

      if (result.text.length >= bestMatch.item.minChars) {
        return Promise.resolve(bestMatch.item);
      } 

      return Promise.reject('query too small. has to approximatly match in size');
    } else {
      return Promise.reject('recording did not match any registered lines');
    }
  }  
  catch (error) {
    return Promise.reject(error);
  }  
}