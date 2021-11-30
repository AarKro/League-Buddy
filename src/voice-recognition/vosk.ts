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
      minChars: 10,
      command: ['Apollo, say hello', 'Apollo, say hi'],
    },
    {
      id: 2,
      minChars: 10,
      command: ['Apollo, pray hey you'],
    },
    {
      id: 3,
      minChars: 10,
      command: ['Apollo, test random'],
    },
  ],
  { 
    includeScore: true,
    keys: ['command'],
    threshold: 0.3
  },
);

export const processVoice = async (filename: string, log = -1) => {
  logLevel(log);
  
  try {
    const result: VoskResult = await transcriptFromFile(filename, model)
    const match = fuse.search(result.text);
    
    console.log('--------------------------------------');
    console.log(result.text);
    console.log(match);
    console.log('--------------------------------------');

    if (match[0]?.item) {
      const item = match[0]?.item;

      if (result.text.length >= item.minChars) {
        return Promise.resolve(item);
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