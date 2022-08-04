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
  // game start
  GAME_START_GENERIC_1: { path: VOICE_FILE_BASE_URL + "game_start_generic_1.mp3", tags: [EventType.GAME_START] },
  GAME_START_GENERIC_2: { path: VOICE_FILE_BASE_URL + "game_start_generic_2.mp3", tags: [EventType.GAME_START] },
  GAME_START_GENERIC_3: { path: VOICE_FILE_BASE_URL + "game_start_generic_3.mp3", tags: [EventType.GAME_START] },
  GAME_START_GENERIC_4: { path: VOICE_FILE_BASE_URL + "game_start_generic_4.mp3", tags: [EventType.GAME_START] },
  GAME_START_GENERIC_5: { path: VOICE_FILE_BASE_URL + "game_start_generic_5.mp3", tags: [EventType.GAME_START] },

  // champion kill
  CHAMPION_KILL_FRIENDLY_GENERIC_1: { path: VOICE_FILE_BASE_URL + "champion_kill_friendly_generic_1.mp3", tags: [EventType.CHAMPION_KILL, VoiceLineTag.SAME_TEAM] },
  CHAMPION_KILL_FRIENDLY_GENERIC_2: { path: VOICE_FILE_BASE_URL + "champion_kill_friendly_generic_2.mp3", tags: [EventType.CHAMPION_KILL, VoiceLineTag.SAME_TEAM] },
  CHAMPION_KILL_FRIENDLY_GENERIC_3: { path: VOICE_FILE_BASE_URL + "champion_kill_friendly_generic_3.mp3", tags: [EventType.CHAMPION_KILL, VoiceLineTag.SAME_TEAM] },
  CHAMPION_KILL_FRIENDLY_GENERIC_4: { path: VOICE_FILE_BASE_URL + "champion_kill_friendly_generic_4.mp3", tags: [EventType.CHAMPION_KILL, VoiceLineTag.SAME_TEAM] },
  CHAMPION_KILL_FRIENDLY_GENERIC_5: { path: VOICE_FILE_BASE_URL + "champion_kill_friendly_generic_5.mp3", tags: [EventType.CHAMPION_KILL, VoiceLineTag.SAME_TEAM] },
  CHAMPION_KILL_FRIENDLY_GENERIC_6: { path: VOICE_FILE_BASE_URL + "champion_kill_friendly_generic_6.mp3", tags: [EventType.CHAMPION_KILL, VoiceLineTag.SAME_TEAM] },
  CHAMPION_KILL_FRIENDLY_GENERIC_7: { path: VOICE_FILE_BASE_URL + "champion_kill_friendly_generic_7.mp3", tags: [EventType.CHAMPION_KILL, VoiceLineTag.SAME_TEAM] },
  CHAMPION_KILL_FRIENDLY_GENERIC_8: { path: VOICE_FILE_BASE_URL + "champion_kill_friendly_generic_8.mp3", tags: [EventType.CHAMPION_KILL, VoiceLineTag.SAME_TEAM] },
  CHAMPION_KILL_FRIENDLY_GENERIC_9: { path: VOICE_FILE_BASE_URL + "champion_kill_friendly_generic_9.mp3", tags: [EventType.CHAMPION_KILL, VoiceLineTag.SAME_TEAM] },
  CHAMPION_KILL_FRIENDLY_GENERIC_10: { path: VOICE_FILE_BASE_URL + "champion_kill_friendly_generic_10.mp3", tags: [EventType.CHAMPION_KILL, VoiceLineTag.SAME_TEAM] },
  CHAMPION_KILL_GENERIC_1: { path: VOICE_FILE_BASE_URL + "champion_kill_generic_1.mp3", tags: [EventType.CHAMPION_KILL] },
  CHAMPION_KILL_GENERIC_2: { path: VOICE_FILE_BASE_URL + "champion_kill_generic_2.mp3", tags: [EventType.CHAMPION_KILL] },
  CHAMPION_KILL_GENERIC_3: { path: VOICE_FILE_BASE_URL + "champion_kill_generic_3.mp3", tags: [EventType.CHAMPION_KILL] },
  CHAMPION_KILL_GENERIC_4: { path: VOICE_FILE_BASE_URL + "champion_kill_generic_4.mp3", tags: [EventType.CHAMPION_KILL] },
  CHAMPION_KILL_GENERIC_5: { path: VOICE_FILE_BASE_URL + "champion_kill_generic_5.mp3", tags: [EventType.CHAMPION_KILL] },
  CHAMPION_KILL_GENERIC_6: { path: VOICE_FILE_BASE_URL + "champion_kill_generic_6.mp3", tags: [EventType.CHAMPION_KILL] },
  CHAMPION_KILL_GENERIC_7: { path: VOICE_FILE_BASE_URL + "champion_kill_generic_7.mp3", tags: [EventType.CHAMPION_KILL] },
  CHAMPION_KILL_GENERIC_8: { path: VOICE_FILE_BASE_URL + "champion_kill_generic_8.mp3", tags: [EventType.CHAMPION_KILL] },
  CHAMPION_KILL_GENERIC_9: { path: VOICE_FILE_BASE_URL + "champion_kill_generic_9.mp3", tags: [EventType.CHAMPION_KILL] },
  CHAMPION_KILL_GENERIC_10: { path: VOICE_FILE_BASE_URL + "champion_kill_generic_10.mp3", tags: [EventType.CHAMPION_KILL] },
  CHAMPION_KILL_EVELYNN: { path: VOICE_FILE_BASE_URL + "champion_kill_evelynn.mp3", tags: [EventType.CHAMPION_KILL, LoLChampionName.EVELYNN] },
  CHAMPION_KILL_TEEMO: { path: VOICE_FILE_BASE_URL + "champion_kill_teemo.mp3", tags: [EventType.CHAMPION_KILL, LoLChampionName.TEEMO] },
  CHAMPION_KILL_TWITCH: { path: VOICE_FILE_BASE_URL + "champion_kill_twitch.mp3", tags: [EventType.CHAMPION_KILL, LoLChampionName.TWITCH] },
  CHAMPION_KILL_YUUMI: { path: VOICE_FILE_BASE_URL + "champion_kill_yuumi.mp3", tags: [EventType.CHAMPION_KILL, LoLChampionName.YUUMI] },
  
  // multikill
  MULTIKILL_DOUBLE_1: { path: VOICE_FILE_BASE_URL + "multikill_double_1.mp3", tags: [EventType.MULTIKILL, MultikillType.DOUBLE] },
  MULTIKILL_DOUBLE_2: { path: VOICE_FILE_BASE_URL + "multikill_double_2.mp3", tags: [EventType.MULTIKILL, MultikillType.DOUBLE] },
  MULTIKILL_DOUBLE_3: { path: VOICE_FILE_BASE_URL + "multikill_double_3.mp3", tags: [EventType.MULTIKILL, MultikillType.DOUBLE] },
  MULTIKILL_DOUBLE_4: { path: VOICE_FILE_BASE_URL + "multikill_double_4.mp3", tags: [EventType.MULTIKILL, MultikillType.DOUBLE] },
  MULTIKILL_TRIPPLE_1: { path: VOICE_FILE_BASE_URL + "multikill_tripple_1.mp3", tags: [EventType.MULTIKILL, MultikillType.TRIPPLE] },
  MULTIKILL_TRIPPLE_2: { path: VOICE_FILE_BASE_URL + "multikill_tripple_2.mp3", tags: [EventType.MULTIKILL, MultikillType.TRIPPLE] },
  MULTIKILL_TRIPPLE_3: { path: VOICE_FILE_BASE_URL + "multikill_tripple_3.mp3", tags: [EventType.MULTIKILL, MultikillType.TRIPPLE] },
  MULTIKILL_QUADRA_1: { path: VOICE_FILE_BASE_URL + "multikill_quadra_1.mp3", tags: [EventType.MULTIKILL, MultikillType.QUADRA] },
  MULTIKILL_QUADRA_2: { path: VOICE_FILE_BASE_URL + "multikill_quadra_2.mp3", tags: [EventType.MULTIKILL, MultikillType.QUADRA] },
  MULTIKILL_PENTA: { path: VOICE_FILE_BASE_URL + "multikill_penta.mp3", tags: [EventType.MULTIKILL, MultikillType.PENTA] },
  MULTIKILL_PENTA_ENEMY: { path: VOICE_FILE_BASE_URL + "multikill_penta_enemy.mp3", tags: [EventType.MULTIKILL, MultikillType.PENTA, VoiceLineTag.ENEMY_TEAM] },

  // player loaded
  PLAYER_LOADED_VAYNE_TOP: { path: VOICE_FILE_BASE_URL + "player_loaded_vayne_top.mp3", tags: [EventType.PLAYER_LOADED, LoLChampionName.VAYNE, LoLPosition.TOP] },
  PLAYER_LOADED_TEEMO_TOP: { path: VOICE_FILE_BASE_URL + "player_loaded_teemo_top.mp3", tags: [EventType.PLAYER_LOADED, LoLChampionName.TEEMO, LoLPosition.TOP] },
  PLAYER_LOADED_TRYNDAMERE_TOP: { path: VOICE_FILE_BASE_URL + "player_loaded_tryndamere_top.mp3", tags: [EventType.PLAYER_LOADED, LoLChampionName.TRYNDAMERE, LoLPosition.TOP] },
  PLAYER_LOADED_MASTERYI_JUNGLE: { path: VOICE_FILE_BASE_URL + "player_loaded_masteryi_jungle.mp3", tags: [EventType.PLAYER_LOADED, LoLChampionName.MASTERYI, LoLPosition.JUNGLE] },
  PLAYER_LOADED_YONE_MID: { path: VOICE_FILE_BASE_URL + "player_loaded_yone_mid.mp3", tags: [EventType.PLAYER_LOADED, LoLChampionName.YONE, LoLPosition.MIDDLE] },
  PLAYER_LOADED_YASUO_MID: { path: VOICE_FILE_BASE_URL + "player_loaded_yasuo_mid.mp3", tags: [EventType.PLAYER_LOADED, LoLChampionName.YASUO, LoLPosition.MIDDLE] },
  PLAYER_LOADED_AURELIONSOL_MID: { path: VOICE_FILE_BASE_URL + "player_loaded_aurelionsol_mid.mp3", tags: [EventType.PLAYER_LOADED, LoLChampionName.AURELIONSOL, LoLPosition.MIDDLE] },
  PLAYER_LOADED_SAMIRA_BOTTOM: { path: VOICE_FILE_BASE_URL + "player_loaded_samira_bot.mp3", tags: [EventType.PLAYER_LOADED, LoLChampionName.SAMIRA, LoLPosition.BOTTOM] },
  PLAYER_LOADED_YUUMI_SUPPORT: { path: VOICE_FILE_BASE_URL + "player_loaded_yuumi_support.mp3", tags: [EventType.PLAYER_LOADED, LoLChampionName.YUUMI, LoLPosition.SUPPORT] },

  // items
  ITEM_IMMORTAL_SHIELDBOW: { path: VOICE_FILE_BASE_URL + "item_immortal_shieldbow.mp3", tags: [EventType.NEW_ITEM, LoLItemID.IMMORTAL_SHIELDBOW] },
  ITEM_ANATHEMAS_CHAINS: { path: VOICE_FILE_BASE_URL + "item_anathemas_chains.mp3", tags: [EventType.NEW_ITEM, LoLItemID.ANATHEMAS_CHAINS] },

  // random
  RANDOM_1: { path: VOICE_FILE_BASE_URL + "random_1.mp3", tags: [EventType.RANDOM] },
  RANDOM_2: { path: VOICE_FILE_BASE_URL + "random_2.mp3", tags: [EventType.RANDOM] },
  RANDOM_3: { path: VOICE_FILE_BASE_URL + "random_3.mp3", tags: [EventType.RANDOM] },
  RANDOM_4: { path: VOICE_FILE_BASE_URL + "random_4.mp3", tags: [EventType.RANDOM] },

  // testing
  BOOP: { path: VOICE_FILE_BASE_URL + "boop.mp3", tags: [VoiceLineTag.TESTING] },
};