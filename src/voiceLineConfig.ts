import { EventType, LoLChampionName, LoLItemID, LoLPosition, MultikillType } from "./model";

export enum VoiceLineTag {
  TESTING,
  SAME_TEAM,
  ENEMY_TEAM,
  JUNGLE_KILL_STOLEN,
  EXECUTED,
}

export type VoiceLineTags = VoiceLineTag | EventType | LoLChampionName | LoLItemID | LoLPosition | MultikillType;

export interface VoiceLine {
  path: string;
  tags: VoiceLineTags[];
}

const VOICE_FILE_BASE_URL = __dirname + "/assets/voice/";

// spelled like this cause it kinda acts as an Enum
export const VoiceLine: {[k: string]: VoiceLine} = {
  // game start
  GAME_START_GENERIC_1:              { path: VOICE_FILE_BASE_URL + "game_start_generic_1.mp3",              tags: [EventType.GAME_START] }, // good luck team!
  GAME_START_GENERIC_2:              { path: VOICE_FILE_BASE_URL + "game_start_generic_2.mp3",              tags: [EventType.GAME_START] }, // let's make them FF15
  GAME_START_GENERIC_3:              { path: VOICE_FILE_BASE_URL + "game_start_generic_3.mp3",              tags: [EventType.GAME_START] }, // let's get that bread!
  GAME_START_GENERIC_4:              { path: VOICE_FILE_BASE_URL + "game_start_generic_4.mp3",              tags: [EventType.GAME_START] }, // summoners join the battle!
  GAME_START_GENERIC_5:              { path: VOICE_FILE_BASE_URL + "game_start_generic_5.mp3",              tags: [EventType.GAME_START] }, // let's win this with the power of friendship, uwu!

  // champion kill
  CHAMPION_KILL_FRIENDLY_GENERIC_1:  { path: VOICE_FILE_BASE_URL + "champion_kill_friendly_generic_1.mp3",  tags: [EventType.CHAMPION_KILL, VoiceLineTag.SAME_TEAM] }, // you'll be back in no time!
  CHAMPION_KILL_FRIENDLY_GENERIC_2:  { path: VOICE_FILE_BASE_URL + "champion_kill_friendly_generic_2.mp3",  tags: [EventType.CHAMPION_KILL, VoiceLineTag.SAME_TEAM] }, // noooooo I was counting on you...
  CHAMPION_KILL_FRIENDLY_GENERIC_3:  { path: VOICE_FILE_BASE_URL + "champion_kill_friendly_generic_3.mp3",  tags: [EventType.CHAMPION_KILL, VoiceLineTag.SAME_TEAM] }, // pls stop griefing
  CHAMPION_KILL_FRIENDLY_GENERIC_4:  { path: VOICE_FILE_BASE_URL + "champion_kill_friendly_generic_4.mp3",  tags: [EventType.CHAMPION_KILL, VoiceLineTag.SAME_TEAM] }, // I think the enemies already ate
  CHAMPION_KILL_FRIENDLY_GENERIC_5:  { path: VOICE_FILE_BASE_URL + "champion_kill_friendly_generic_5.mp3",  tags: [EventType.CHAMPION_KILL, VoiceLineTag.SAME_TEAM] }, // don't worry, barrely a scratch
  CHAMPION_KILL_FRIENDLY_GENERIC_6:  { path: VOICE_FILE_BASE_URL + "champion_kill_friendly_generic_6.mp3",  tags: [EventType.CHAMPION_KILL, VoiceLineTag.SAME_TEAM] }, // where's Akshan when you need him?
  CHAMPION_KILL_FRIENDLY_GENERIC_7:  { path: VOICE_FILE_BASE_URL + "champion_kill_friendly_generic_7.mp3",  tags: [EventType.CHAMPION_KILL, VoiceLineTag.SAME_TEAM] }, // gg go next
  CHAMPION_KILL_FRIENDLY_GENERIC_8:  { path: VOICE_FILE_BASE_URL + "champion_kill_friendly_generic_8.mp3",  tags: [EventType.CHAMPION_KILL, VoiceLineTag.SAME_TEAM] }, // yeah I'm calling it already, jungle diff
  CHAMPION_KILL_FRIENDLY_GENERIC_9:  { path: VOICE_FILE_BASE_URL + "champion_kill_friendly_generic_9.mp3",  tags: [EventType.CHAMPION_KILL, VoiceLineTag.SAME_TEAM] }, // yeah that thing's totally OP
  CHAMPION_KILL_FRIENDLY_GENERIC_10: { path: VOICE_FILE_BASE_URL + "champion_kill_friendly_generic_10.mp3", tags: [EventType.CHAMPION_KILL, VoiceLineTag.SAME_TEAM] }, // ok, guess we're not doing THAT again
  CHAMPION_KILL_GENERIC_1:           { path: VOICE_FILE_BASE_URL + "champion_kill_generic_1.mp3",           tags: [EventType.CHAMPION_KILL] }, // lol gotchu
  CHAMPION_KILL_GENERIC_2:           { path: VOICE_FILE_BASE_URL + "champion_kill_generic_2.mp3",           tags: [EventType.CHAMPION_KILL] }, // champion diff
  CHAMPION_KILL_GENERIC_3:           { path: VOICE_FILE_BASE_URL + "champion_kill_generic_3.mp3",           tags: [EventType.CHAMPION_KILL] }, // stay mad, poser
  CHAMPION_KILL_GENERIC_4:           { path: VOICE_FILE_BASE_URL + "champion_kill_generic_4.mp3",           tags: [EventType.CHAMPION_KILL] }, // winning the game, step by step
  CHAMPION_KILL_GENERIC_5:           { path: VOICE_FILE_BASE_URL + "champion_kill_generic_5.mp3",           tags: [EventType.CHAMPION_KILL] }, // omg you're so OP!
  CHAMPION_KILL_GENERIC_6:           { path: VOICE_FILE_BASE_URL + "champion_kill_generic_6.mp3",           tags: [EventType.CHAMPION_KILL] }, // Outskilled!
  CHAMPION_KILL_GENERIC_7:           { path: VOICE_FILE_BASE_URL + "champion_kill_generic_7.mp3",           tags: [EventType.CHAMPION_KILL] }, // Nerfs can't touch you!
  CHAMPION_KILL_GENERIC_8:           { path: VOICE_FILE_BASE_URL + "champion_kill_generic_8.mp3",           tags: [EventType.CHAMPION_KILL] }, // go back to the practice tool
  CHAMPION_KILL_GENERIC_9:           { path: VOICE_FILE_BASE_URL + "champion_kill_generic_9.mp3",           tags: [EventType.CHAMPION_KILL] }, // easy peazy
  CHAMPION_KILL_GENERIC_10:          { path: VOICE_FILE_BASE_URL + "champion_kill_generic_10.mp3",          tags: [EventType.CHAMPION_KILL] }, // *he* chuckles, you're in danger
  CHAMPION_KILL_EXECUTED_FRIENDLY_1: { path: VOICE_FILE_BASE_URL + "champion_kill_executed_friendly_1.mp3", tags: [EventType.CHAMPION_KILL, VoiceLineTag.EXECUTED, VoiceLineTag.SAME_TEAM] }, // uhh calculated?
  CHAMPION_KILL_EXECUTED_FRIENDLY_2: { path: VOICE_FILE_BASE_URL + "champion_kill_executed_friendly_2.mp3", tags: [EventType.CHAMPION_KILL, VoiceLineTag.EXECUTED, VoiceLineTag.SAME_TEAM] }, // let's pretend that was intended
  CHAMPION_KILL_EXECUTED_FRIENDLY_3: { path: VOICE_FILE_BASE_URL + "champion_kill_executed_friendly_3.mp3", tags: [EventType.CHAMPION_KILL, VoiceLineTag.EXECUTED, VoiceLineTag.SAME_TEAM] }, // you donkey!
  CHAMPION_KILL_EXECUTED_1:          { path: VOICE_FILE_BASE_URL + "champion_kill_executed_1.mp3",          tags: [EventType.CHAMPION_KILL, VoiceLineTag.EXECUTED] }, // haha, what a noob!
  CHAMPION_KILL_EXECUTED_2:          { path: VOICE_FILE_BASE_URL + "champion_kill_executed_2.mp3",          tags: [EventType.CHAMPION_KILL, VoiceLineTag.EXECUTED] }, // don't even have to touch him
  CHAMPION_KILL_EXECUTED_3:          { path: VOICE_FILE_BASE_URL + "champion_kill_executed_3.mp3",          tags: [EventType.CHAMPION_KILL, VoiceLineTag.EXECUTED] }, // they are doing our job themselfs!
  CHAMPION_KILL_EVELYNN:             { path: VOICE_FILE_BASE_URL + "champion_kill_evelynn.mp3",             tags: [EventType.CHAMPION_KILL, LoLChampionName.EVELYNN] }, // Evelynn, next time you should use more protection ;)
  CHAMPION_KILL_TEEMO:               { path: VOICE_FILE_BASE_URL + "champion_kill_teemo.mp3",               tags: [EventType.CHAMPION_KILL, LoLChampionName.TEEMO] }, // freaking rat!
  CHAMPION_KILL_YUUMI:               { path: VOICE_FILE_BASE_URL + "champion_kill_yuumi.mp3",               tags: [EventType.CHAMPION_KILL, LoLChampionName.YUUMI] }, // This time, stay AFK, thanks
  
  // multikill
  MULTIKILL_DOUBLE_1:                { path: VOICE_FILE_BASE_URL + "multikill_double_1.mp3",                tags: [EventType.MULTIKILL, MultikillType.DOUBLE] }, // twice the fun
  MULTIKILL_DOUBLE_2:                { path: VOICE_FILE_BASE_URL + "multikill_double_2.mp3",                tags: [EventType.MULTIKILL, MultikillType.DOUBLE] }, // another one bites the dust
  MULTIKILL_DOUBLE_3:                { path: VOICE_FILE_BASE_URL + "multikill_double_3.mp3",                tags: [EventType.MULTIKILL, MultikillType.DOUBLE] }, // they're slowly falling apart!
  MULTIKILL_DOUBLE_4:                { path: VOICE_FILE_BASE_URL + "multikill_double_4.mp3",                tags: [EventType.MULTIKILL, MultikillType.DOUBLE] }, // there's more, I can feel it!
  MULTIKILL_TRIPPLE_1:               { path: VOICE_FILE_BASE_URL + "multikill_tripple_1.mp3",               tags: [EventType.MULTIKILL, MultikillType.TRIPPLE] }, // tripple? Not even my final form!
  MULTIKILL_TRIPPLE_2:               { path: VOICE_FILE_BASE_URL + "multikill_tripple_2.mp3",               tags: [EventType.MULTIKILL, MultikillType.TRIPPLE] }, // Yea I would blame my team too
  MULTIKILL_TRIPPLE_3:               { path: VOICE_FILE_BASE_URL + "multikill_tripple_3.mp3",               tags: [EventType.MULTIKILL, MultikillType.TRIPPLE] }, // oooahhh good things come in threes
  MULTIKILL_QUADRA_1:                { path: VOICE_FILE_BASE_URL + "multikill_quadra_1.mp3",                tags: [EventType.MULTIKILL, MultikillType.QUADRA] }, // DESTRUUUCTTTION!!!
  MULTIKILL_QUADRA_2:                { path: VOICE_FILE_BASE_URL + "multikill_quadra_2.mp3",                tags: [EventType.MULTIKILL, MultikillType.QUADRA] }, // ooahh one more, where are you?
  MULTIKILL_PENTA:                   { path: VOICE_FILE_BASE_URL + "multikill_penta.mp3",                   tags: [EventType.MULTIKILL, MultikillType.PENTA] }, // PENTAKIIILLLLLL
  MULTIKILL_PENTA_ENEMY:             { path: VOICE_FILE_BASE_URL + "multikill_penta_enemy.mp3",             tags: [EventType.MULTIKILL, MultikillType.PENTA, VoiceLineTag.ENEMY_TEAM] }, // uhm, yea lets not talk about that
  
  // epic jungle monster kills
  DRAGON_KILL_1:                     { path: VOICE_FILE_BASE_URL + "dragon_kill_1.mp3",                     tags: [EventType.DRAGON_KILL] }, // come here, lil dragon
  DRAGON_KILL_2:                     { path: VOICE_FILE_BASE_URL + "dragon_kill_2.mp3",                     tags: [EventType.DRAGON_KILL] }, // naww, such a good boy
  DRAGON_KILL_3:                     { path: VOICE_FILE_BASE_URL + "dragon_kill_3.mp3",                     tags: [EventType.DRAGON_KILL] }, // naww, such a good girl
  DRAGON_KILL_4:                     { path: VOICE_FILE_BASE_URL + "dragon_kill_4.mp3",                     tags: [EventType.DRAGON_KILL] }, // gotta catch 'em all!
  DRAGON_KILL_STOLEN:                { path: VOICE_FILE_BASE_URL + "dragon_kill_stolen.mp3",                tags: [EventType.DRAGON_KILL, VoiceLineTag.JUNGLE_KILL_STOLEN] }, // OOAHHH JUNGLE DIFF!
  DRAGON_KILL_STOLEN_ENEMY:          { path: VOICE_FILE_BASE_URL + "dragon_kill_stolen_enemy.mp3",          tags: [EventType.DRAGON_KILL, VoiceLineTag.JUNGLE_KILL_STOLEN, VoiceLineTag.ENEMY_TEAM] }, // you do know where smite is, ...right?
  HERALD_KILL:                       { path: VOICE_FILE_BASE_URL + "herald_kill.mp3",                       tags: [EventType.HERALD_KILL] }, // lil' bug Shelly joined our team
  HERALD_KILL_STOLEN:                { path: VOICE_FILE_BASE_URL + "herald_kill_stolen.mp3",                tags: [EventType.HERALD_KILL, VoiceLineTag.JUNGLE_KILL_STOLEN] }, // Our bug!
  HERALD_KILL_STOLEN_ENEMY:          { path: VOICE_FILE_BASE_URL + "herald_kill_stolen_enemy.mp3",          tags: [EventType.HERALD_KILL, VoiceLineTag.JUNGLE_KILL_STOLEN, VoiceLineTag.ENEMY_TEAM] }, // didn't wan't him anyway...
  BARON_KILL_1:                      { path: VOICE_FILE_BASE_URL + "baron_kill_1.mp3",                      tags: [EventType.BARON_KILL] }, // big dead worm equals big beefy minions!
  BARON_KILL_2:                      { path: VOICE_FILE_BASE_URL + "baron_kill_2.mp3",                      tags: [EventType.BARON_KILL] }, // Ayy purples my favorite colour!
  BARON_KILL_STOLEN:                 { path: VOICE_FILE_BASE_URL + "baron_kill_stolen.mp3",                 tags: [EventType.BARON_KILL, VoiceLineTag.JUNGLE_KILL_STOLEN] }, // we've got a literal god jungler
  BARON_KILL_STOLEN_ENEMY:           { path: VOICE_FILE_BASE_URL + "baron_kill_stolen_enemy.mp3",           tags: [EventType.BARON_KILL, VoiceLineTag.JUNGLE_KILL_STOLEN, VoiceLineTag.ENEMY_TEAM] }, // time to defend...

  // player loaded
  PLAYER_LOADED_VAYNE_TOP:           { path: VOICE_FILE_BASE_URL + "player_loaded_vayne_top.mp3",           tags: [EventType.PLAYER_LOADED, LoLChampionName.VAYNE, LoLPosition.TOP] }, // How cringe do you have to be to play Vayne...
  PLAYER_LOADED_TEEMO_TOP:           { path: VOICE_FILE_BASE_URL + "player_loaded_teemo_top.mp3",           tags: [EventType.PLAYER_LOADED, LoLChampionName.TEEMO, LoLPosition.TOP] }, // Little yordle rat detected
  PLAYER_LOADED_TRYNDAMERE_TOP:      { path: VOICE_FILE_BASE_URL + "player_loaded_tryndamere_top.mp3",      tags: [EventType.PLAYER_LOADED, LoLChampionName.TRYNDAMERE, LoLPosition.TOP] }, // ANGRY MAN NO DIE!
  PLAYER_LOADED_YONE_MID:            { path: VOICE_FILE_BASE_URL + "player_loaded_yone_mid.mp3",            tags: [EventType.PLAYER_LOADED, LoLChampionName.YONE, LoLPosition.MIDDLE] }, // 200 years of gamedesign right there
  PLAYER_LOADED_YASUO_MID:           { path: VOICE_FILE_BASE_URL + "player_loaded_yasuo_mid.mp3",           tags: [EventType.PLAYER_LOADED, LoLChampionName.YASUO, LoLPosition.MIDDLE] }, // HASAGI
  PLAYER_LOADED_AURELIONSOL_MID:     { path: VOICE_FILE_BASE_URL + "player_loaded_aurelionsol_mid.mp3",     tags: [EventType.PLAYER_LOADED, LoLChampionName.AURELIONSOL, LoLPosition.MIDDLE] }, // 0/10 powerspike incoming
  PLAYER_LOADED_SAMIRA_BOTTOM:       { path: VOICE_FILE_BASE_URL + "player_loaded_samira_bot.mp3",          tags: [EventType.PLAYER_LOADED, LoLChampionName.SAMIRA, LoLPosition.BOTTOM] }, // Have fun on this bot lane...
  PLAYER_LOADED_YUUMI_SUPPORT:       { path: VOICE_FILE_BASE_URL + "player_loaded_yuumi_support.mp3",       tags: [EventType.PLAYER_LOADED, LoLChampionName.YUUMI, LoLPosition.SUPPORT] }, // ughh, why's there a cat in this game

  // items
  ITEM_IMMORTAL_SHIELDBOW:           { path: VOICE_FILE_BASE_URL + "item_immortal_shieldbow.mp3",           tags: [EventType.NEW_ITEM, LoLItemID.IMMORTAL_SHIELDBOW] }, // cringe bow equals smol pp

  // random
  RANDOM_1:                          { path: VOICE_FILE_BASE_URL + "random_1.mp3",                          tags: [EventType.RANDOM] }, // booba
  RANDOM_2:                          { path: VOICE_FILE_BASE_URL + "random_2.mp3",                          tags: [EventType.RANDOM] }, // top diff
  RANDOM_3:                          { path: VOICE_FILE_BASE_URL + "random_3.mp3",                          tags: [EventType.RANDOM] }, // jungle diff
  RANDOM_4:                          { path: VOICE_FILE_BASE_URL + "random_4.mp3",                          tags: [EventType.RANDOM] }, // mid diff
  RANDOM_5:                          { path: VOICE_FILE_BASE_URL + "random_5.mp3",                          tags: [EventType.RANDOM] }, // bot diff
  RANDOM_6:                          { path: VOICE_FILE_BASE_URL + "random_6.mp3",                          tags: [EventType.RANDOM] }, // supp diff

  // testing
  BOOP:                              { path: VOICE_FILE_BASE_URL + "boop.mp3",                              tags: [VoiceLineTag.TESTING] }, // beep
};