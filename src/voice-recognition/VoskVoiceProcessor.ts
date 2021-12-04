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

const addToVoiceProcessQueue = (filename: string) => {
  voiceProcessQueue.push(filename);
}
  
const getItemFromVoiceProcessQueue = () => { 
  return voiceProcessQueue.shift();
}
  
const clearVoiceProcessQueue = async () => {
  const promises = voiceProcessQueue.map((filename) => (
    fs.unlink(filename, () => undefined)
  ));

  await Promise.all(promises);

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

      if (process.send) process.send(bestMatch.item.id);
      
      await clearVoiceProcessQueue();
    }
  } catch (err) {
    console.log(err)
  } finally {
    fs.unlink(filename, () => undefined);
  }

  return Promise.resolve();
}

const startVoiceProcessing = async () => {
  isProcessingVoiceFile = true;
  while (voiceProcessQueue.length) {
    const filename = getItemFromVoiceProcessQueue();
    if (filename) {
      await processVoiceFile(filename);
    }
  }
  isProcessingVoiceFile = false;
}

process.on('message', (filename: string) => {
  addToVoiceProcessQueue(filename);

  if (!isProcessingVoiceFile) {
    startVoiceProcessing();
  }
});

logLevel(Number(process.argv[3]));
startVoiceProcessing();