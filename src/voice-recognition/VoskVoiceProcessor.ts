import fs from 'fs';
import { playVoiceFile } from '../utils';
import { VOICE_THANK_YOU, VOICE_YAMETE } from '../voiceUrls';
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

export class VoskVoiceProcessor {
  private voiceProcessQueue: string[] = [];
  private model: unknown;
  private isProcessingVoiceFile: boolean = false;

  constructor(pathToModel: string) {
    this.model = loadModel(pathToModel);
  }
  
  public startVoiceProcessing = async (log = -1) => {
    logLevel(log);
    
    setInterval(async () => {
      if (!this.isProcessingVoiceFile) {
        const filename = this.getItemFromVoiceProcessQueue();
        if (filename) {
          this.isProcessingVoiceFile = true;
          await this.processVoiceFile(filename);
          this.isProcessingVoiceFile = false;
        }
      }
    }, 333);  
  }
  
  public addToVoiceProcessQueue(filename: string) {
    this.voiceProcessQueue.push(filename);
  }
  
  private getItemFromVoiceProcessQueue() { 
    return this.voiceProcessQueue.shift();
  }
  
  private clearVoiceProcessQueue() {
    this.voiceProcessQueue.forEach((filename) => {
      fs.unlink(filename, () => undefined);
    });

    this.voiceProcessQueue.length = 0;
  }

  private processMatch(id: number) {
    switch (id) {
      case 1:
        playVoiceFile(VOICE_THANK_YOU);
        break;
      case 2:
        playVoiceFile(VOICE_YAMETE);
        break;
      default:
    }
  }

  private async processVoiceFile(filename: string) {
    try {
      const result: VoskResult = await transcriptFromFile(filename, this.model, { grammar: voskGrammar } )
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
        console.log(result.text);
        console.log(bestMatch);
        console.log('--------------------------------------');

        this.clearVoiceProcessQueue();
        this.processMatch(bestMatch.item.id);
      }
    } catch (err) {
      console.log(err)
    } finally {
      fs.unlink(filename, () => undefined);
    }

    return Promise.resolve();
  }
}