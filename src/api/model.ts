export enum EventType {
  GAME_START = "GameStart",
  CHAMPION_KILL = "ChampionKill",
  MULTIKILL = "Multikill",
}

export interface LoLEvent {
  EventID: number;
  EventTime: number;
  EventName: EventType;
}

export interface GameStartEvent extends LoLEvent {
}

export interface ChampionKillEvent extends LoLEvent {
  KillerName: string;
  VictimName: string;
  Assisters: string[];
}

export interface MultikillEvent extends ChampionKillEvent {
  KillStreak: number;
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