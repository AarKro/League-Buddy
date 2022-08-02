// const VOICE_FILE_BASE_URL = 'https://github.com/AarKro/Apollo/raw/main/src/assets/voice/';
const VOICE_FILE_BASE_URL = __dirname + '/assets/voice/';

export enum VoiceLineTag {
  GAME_START,
  CHAMPION_KILL,
  DOUBLE_KILL,
  TRIPPLE_KILL,
  QUADRA_KILL,
  PENTA_KILL,
}

export interface VoiceLine {
  path: string;
  tags: VoiceLineTag[];
}

// spelled like this cause it kinda acts as an Enum
export const VoiceLine: {[k: string]: VoiceLine} = {
  BOOP: { path: VOICE_FILE_BASE_URL + 'boop.mp3', tags: [VoiceLineTag.GAME_START] },
}
