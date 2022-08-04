import { ChampionKill } from "./championKill";
import { GameStart } from "./gameStart";
import { NewItem } from "./newItem";
import { Multikill } from "./multikill";
import { PlayerLoaded } from "./playerLoaded";
import { Random } from "./random";
import { EventType } from "../../model";
import { DragonKill } from "./dragonKill";
import { HeraldKill } from "./heraldKill";
import { BaronKill } from "./baronKill";

export const EVENT_PROCESSORS: {[k in EventType]: (event: any) => Promise<void>} = {
  [EventType.GAME_START]: GameStart,
  [EventType.CHAMPION_KILL]: ChampionKill,
  [EventType.MULTIKILL]: Multikill,
  [EventType.PLAYER_LOADED]: PlayerLoaded,
  [EventType.NEW_ITEM]: NewItem,
  [EventType.RANDOM]: Random,
  [EventType.DRAGON_KILL]: DragonKill,
  [EventType.HERALD_KILL]: HeraldKill,
  [EventType.BARON_KILL]: BaronKill,
};