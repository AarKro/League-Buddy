import vosk from 'vosk';
import fs from 'fs';
import { Readable } from 'stream';
import wav from "wav";

const model = new vosk.Model(__dirname + '/../assets/vosk-model-en-us-0.22-lgraph');

export const processVoice = (filename: string) => {
  vosk.setLogLevel(0);
  
  const wfReader = new wav.Reader();
  const wfReadable = new Readable().wrap(wfReader);
  
  wfReader.on('format', async ({ audioFormat, sampleRate, channels }) => {
    if (audioFormat != 1 || channels != 1) {
      console.error("Audio file must be WAV format mono PCM.");
      process.exit(1);
    }
    const rec = new vosk.Recognizer({model: model, sampleRate: sampleRate});
    rec.setMaxAlternatives(10);
    rec.setWords(true);
    for await (const data of wfReadable) {
      const end_of_speech = rec.acceptWaveform(data);
      if (end_of_speech) {
        console.log(JSON.stringify(rec.result(), null, 4));
      }
    }
    console.log(JSON.stringify(rec.finalResult(rec), null, 4));
    rec.free();
  });
  
  fs.createReadStream(filename, {'highWaterMark': 4096}).pipe(wfReader);
}