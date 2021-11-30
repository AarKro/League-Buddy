import { OpusEncoder } from '@discordjs/opus';
import { EndBehaviorType, VoiceReceiver } from '@discordjs/voice';
import { User } from 'discord.js';
import { FileWriter } from 'wav';
import { processVoice } from './vosk';
import { Transform } from 'stream';
import fs from 'fs';
import { playVoiceFile } from '../events/utils';
import { VOICE_LISA_HELLO } from '../voiceUrls';

const getDisplayName = (userId: string, user?: User) => {
	return user ? `${user.username}_${user.discriminator}` : userId;
}

export const createListeningStream = (receiver: VoiceReceiver, userId: string, user?: User) => {
	const filename = `${__dirname}/../assets/recordings/${Date.now()}-${getDisplayName(userId, user)}.wav`;
	const encoder = new OpusEncoder(16000, 1)
	
	const audioFile =	receiver.subscribe(userId, {
			end: {
				behavior: EndBehaviorType.AfterSilence,
				duration: 100,
			},
	})
	.pipe(new OpusDecodingStream({}, encoder))
	.pipe(new FileWriter(filename, {
			channels: 1,
			sampleRate: 16000
	}));

	audioFile.on('done', () => {
		fs.stat(filename, async (err, stats) => {
			try {
				// Only process file if its bigger than 10KB.
				// This way we ignore empty recordings.
				// Also ignore files bigger than 100KB, since they likely arent commands and take a long time to process
				if (stats.size > 10000 && stats.size < 100000) {
					const result = await processVoice(filename);

					if (result.id === 1) {
						playVoiceFile(VOICE_LISA_HELLO);
					}
				} else throw 'recording smaller than 10KB or bigger than 100KB'
			} catch (err) {
				fs.unlink(filename, () => undefined);
			}
		});
	});
}

// weird internet magic... maybe investigate more later
class OpusDecodingStream extends Transform {
	encoder
	
	constructor(options: any, encoder: any) {
		super(options)
		this.encoder = encoder
	}
	
	_transform(data: any, encoding: any, callback: any) {
		this.push(this.encoder.decode(data))
		callback()
	}
}