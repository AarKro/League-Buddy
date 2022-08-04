import { EventType, LoLChampionName, LoLItemID, LoLPosition, MultikillType } from "./model";

const VOICE_FILE_BASE_URL = __dirname + "/assets/voice/";

export enum VoiceLineTag {
  TESTING,
  SAME_TEAM,
  ENEMY_TEAM,
}

export type VoiceLineTags = VoiceLineTag | EventType | LoLChampionName | LoLItemID | LoLPosition | MultikillType;

export interface VoiceLine {
  path: string;
  tags: VoiceLineTags[];
}

// spelled like this cause it kinda acts as an Enum
export const VoiceLine: {[k: string]: VoiceLine} = {
  // testing
  BOOP: { path: VOICE_FILE_BASE_URL + "boop.mp3", tags: [VoiceLineTag.TESTING] },

  // game start
  GAME_START_GENERIC_1: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.GAME_START] },
  GAME_START_GENERIC_2: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.GAME_START] },
  GAME_START_GENERIC_3: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.GAME_START] },
  GAME_START_GENERIC_4: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.GAME_START] },
  GAME_START_GENERIC_5: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.GAME_START] },

  // champion kill
  CHAMPION_KILL_FRIENDLY_GENERIC_1: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.CHAMPION_KILL, VoiceLineTag.SAME_TEAM] },
  CHAMPION_KILL_FRIENDLY_GENERIC_2: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.CHAMPION_KILL, VoiceLineTag.SAME_TEAM] },
  CHAMPION_KILL_FRIENDLY_GENERIC_3: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.CHAMPION_KILL, VoiceLineTag.SAME_TEAM] },
  CHAMPION_KILL_FRIENDLY_GENERIC_4: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.CHAMPION_KILL, VoiceLineTag.SAME_TEAM] },
  CHAMPION_KILL_FRIENDLY_GENERIC_5: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.CHAMPION_KILL, VoiceLineTag.SAME_TEAM] },
  CHAMPION_KILL_FRIENDLY_GENERIC_6: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.CHAMPION_KILL, VoiceLineTag.SAME_TEAM] },
  CHAMPION_KILL_FRIENDLY_GENERIC_7: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.CHAMPION_KILL, VoiceLineTag.SAME_TEAM] },
  CHAMPION_KILL_FRIENDLY_GENERIC_8: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.CHAMPION_KILL, VoiceLineTag.SAME_TEAM] },
  CHAMPION_KILL_FRIENDLY_GENERIC_9: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.CHAMPION_KILL, VoiceLineTag.SAME_TEAM] },
  CHAMPION_KILL_FRIENDLY_GENERIC_10: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.CHAMPION_KILL, VoiceLineTag.SAME_TEAM] },
  CHAMPION_KILL_GENERIC_1: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.CHAMPION_KILL] },
  CHAMPION_KILL_GENERIC_2: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.CHAMPION_KILL] },
  CHAMPION_KILL_GENERIC_3: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.CHAMPION_KILL] },
  CHAMPION_KILL_GENERIC_4: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.CHAMPION_KILL] },
  CHAMPION_KILL_GENERIC_5: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.CHAMPION_KILL] },
  CHAMPION_KILL_GENERIC_6: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.CHAMPION_KILL] },
  CHAMPION_KILL_GENERIC_7: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.CHAMPION_KILL] },
  CHAMPION_KILL_GENERIC_8: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.CHAMPION_KILL] },
  CHAMPION_KILL_GENERIC_9: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.CHAMPION_KILL] },
  CHAMPION_KILL_GENERIC_10: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.CHAMPION_KILL] },
  CHAMPION_KILL_EVELYNN: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.CHAMPION_KILL, LoLChampionName.EVELYNN] },
  CHAMPION_KILL_TEEMO: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.CHAMPION_KILL, LoLChampionName.TEEMO] },
  CHAMPION_KILL_TWITCH: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.CHAMPION_KILL, LoLChampionName.TWITCH] },
  CHAMPION_KILL_YUUMI: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.CHAMPION_KILL, LoLChampionName.YUUMI] },
  
  // multikill
  DOUBLE_KILL_1: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.MULTIKILL, MultikillType.DOUBLE] },
  DOUBLE_KILL_2: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.MULTIKILL, MultikillType.DOUBLE] },
  DOUBLE_KILL_3: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.MULTIKILL, MultikillType.DOUBLE] },
  DOUBLE_KILL_4: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.MULTIKILL, MultikillType.DOUBLE] },
  TRIPPLE_KILL_1: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.MULTIKILL, MultikillType.TRIPPLE] },
  TRIPPLE_KILL_2: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.MULTIKILL, MultikillType.TRIPPLE] },
  TRIPPLE_KILL_3: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.MULTIKILL, MultikillType.TRIPPLE] },
  QUADRA_KILL_1: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.MULTIKILL, MultikillType.QUADRA] },
  QUADRA_KILL_2: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.MULTIKILL, MultikillType.QUADRA] },
  PENTA_KILL: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.MULTIKILL, MultikillType.PENTA] },
  PENTA_KILL_ENEMY: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.MULTIKILL, MultikillType.PENTA, VoiceLineTag.ENEMY_TEAM] },

  // player loaded
  VAYNE_TOP: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.PLAYER_LOADED, LoLChampionName.VAYNE, LoLPosition.TOP] },
  TEEMO_TOP: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.PLAYER_LOADED, LoLChampionName.TEEMO, LoLPosition.TOP] },
  TRYNDAMERE_TOP: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.PLAYER_LOADED, LoLChampionName.TRYNDAMERE, LoLPosition.TOP] },
  MASTERYI_JUNGLE: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.PLAYER_LOADED, LoLChampionName.MASTERYI, LoLPosition.JUNGLE] },
  YONE_MID:  { path: VOICE_FILE_BASE_URL + "", tags: [EventType.PLAYER_LOADED, LoLChampionName.YONE, LoLPosition.MIDDLE] },
  YASUO_MID:  { path: VOICE_FILE_BASE_URL + "", tags: [EventType.PLAYER_LOADED, LoLChampionName.YASUO, LoLPosition.MIDDLE] },
  AURELIONSOL_MID: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.PLAYER_LOADED, LoLChampionName.AURELIONSOL, LoLPosition.MIDDLE] },
  SAMIRA_BOTTOM: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.PLAYER_LOADED, LoLChampionName.SAMIRA, LoLPosition.BOTTOM] },
  YUUMI_SUPPORT: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.PLAYER_LOADED, LoLChampionName.YUUMI, LoLPosition.SUPPORT] },

  // items
  IMMORTAL_SHIELDBOW: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.NEW_ITEM, LoLItemID.IMMORTAL_SHIELDBOW] },
  ANATHEMAS_CHAINS: { path: VOICE_FILE_BASE_URL + "", tags: [EventType.NEW_ITEM, LoLItemID.ANATHEMAS_CHAINS] },
};