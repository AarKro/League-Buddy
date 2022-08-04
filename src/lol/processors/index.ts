import { ChampionKill } from "./championKill";
import { GameStart } from "./gameStart";
import { NewItem } from "./newItem";
import { Multikill } from "./multikill";
import { PlayerLoaded } from "./playerLoaded";
import { Random } from "./random";
import { EventType } from "../../model";

export const EVENT_PROCESSORS: {[k in EventType]: (event: any) => Promise<void>} = {
  [EventType.GAME_START]: GameStart,
  [EventType.CHAMPION_KILL]: ChampionKill,
  [EventType.MULTIKILL]: Multikill,
  [EventType.PLAYER_LOADED]: PlayerLoaded,
  [EventType.NEW_ITEM]: NewItem,
  [EventType.RANDOM]: Random,
};