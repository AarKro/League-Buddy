export enum EventType {
  GAME_START = "GameStart",
  CHAMPION_KILL = "ChampionKill",
  MULTIKILL = "Multikill",
  ITEM_CHANGE = "ItemChange",
}

export interface LoLEvent {
  EventName: EventType;
  processorId?: number;
}

export interface LoLAPIEvent extends LoLEvent{
  EventID: number;
  EventTime: number;
}

export interface GameStartEvent extends LoLAPIEvent {
}

export interface ChampionKillEvent extends LoLAPIEvent {
  KillerName: string;
  VictimName: string;
  Assisters: string[];
}

export interface MultikillEvent extends ChampionKillEvent {
  KillStreak: number;
}

export interface ItemChangeEvent extends LoLEvent {
  oldPlayer: Champion;
  newPlayer: Champion;
}

export enum LoLTeam {
  ORDER = "ORDER",
  CHAOS = "CHAOS",
}

export interface Champion {
  championName: string;
  isBot: boolean;
  isDead: boolean;
  items: ChampionItem[];
  level: number;
  position: string;
  rawChampionName: string;
  rawSkinName: string;
  respawnTimer: 0;
  runes: ChampionRunes;
  scores: ChampionScores;
  skinID: number;
  skinName: string;
  summonerName: string;
  summonerSpells: ChampionSummonerSpells;
  team: LoLTeam;
}

export interface ChampionItem {
  canUse: boolean;
  consumable: false;
  count: number;
  displayName: string;
  itemID: number;
  price: number;
  rawDescription: string;
  rawDisplayName: string;
  slot: number;
}

export interface ChampionRunes {
  keystone: Rune;
  primaryRuneTree: Rune;
  secondaryRuneTree: Rune;
}

export interface Rune {
  displayName: string;
  id: number;
  rawDescription: string;
  rawDisplayName: string;
}

export interface ChampionScores {
  assists: number;
  creepScore: number;
  deaths: number;
  kills: number;
  wardScore: number;
}

export interface ChampionSummonerSpells {
  summonerSpellOne: SummonerSpell;
  summonerSpellTwo: SummonerSpell;
}

export interface SummonerSpell {
  displayName: string;
  rawDescription: string;
  rawDisplayName: string;
}