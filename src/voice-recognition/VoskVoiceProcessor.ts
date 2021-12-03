import fs from 'fs';
import { fuzzyMatcher, voskGrammar } from './voiceCommandConfig';

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

const voiceProcessQueue: string[] = [];
const model: unknown = loadModel(process.argv[2]);
let isProcessingVoiceFile: boolean = false;

const startVoiceProcessing = async () => {
  setInterval(async () => {
    if (!isProcessingVoiceFile) {
      const filename = getItemFromVoiceProcessQueue();
      if (filename) {
        isProcessingVoiceFile = true;
        await processVoiceFile(filename);
        isProcessingVoiceFile = false;
      }
    }
  }, 333);  
}
  
const addToVoiceProcessQueue = (filename: string) => {
  voiceProcessQueue.push(filename);
}
  
const getItemFromVoiceProcessQueue = () => { 
  return voiceProcessQueue.shift();
}
  
const clearVoiceProcessQueue = () => {
  voiceProcessQueue.forEach((filename) => {
    fs.unlink(filename, () => undefined);
  });

  voiceProcessQueue.length = 0;
}

const processVoiceFile = async (filename: string) => {
  try {
    const result: VoskResult = await transcriptFromFile(filename, model, { grammar: voskGrammar } );
    const matches = fuzzyMatcher.search(result.text);
    
    console.log(filename.split('/')[filename.split('/').length - 1] + ' --- ' + result.text)

    if (matches.length) {
      let bestMatch = matches[0];
      for (const match of matches) {
        bestMatch = (match.score || 1) < (bestMatch.score || 1) ? match : bestMatch;

        if (Number(match.score) > 1) {
          bestMatch = match
          return;
        }
      }
      
      console.log('--------------------------------------');
      console.log(new Date().toLocaleString())
      console.log(result.text);
      console.log(bestMatch);
      console.log('--------------------------------------');

      clearVoiceProcessQueue();
      if (process.send) process.send(bestMatch.item.id);
    }
  } catch (err) {
    console.log(err)
  } finally {
    fs.unlink(filename, () => undefined);
  }

  return Promise.resolve();
}

process.on('message', (filename: string) => {
  addToVoiceProcessQueue(filename);
});

logLevel(Number(process.argv[3]));
startVoiceProcessing();