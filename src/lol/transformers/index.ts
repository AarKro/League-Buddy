import { EventType, LoLAPIEvent } from "../../model";
import { Default } from "./default";
import { Multikill } from "./multikill";

export const EVENT_TRANSFORMERS: {[k in EventType]: (event: any, transformedData: LoLAPIEvent[]) => void} = {
  [EventType.GAME_START]: Default,
  [EventType.CHAMPION_KILL]: Default,
  [EventType.MULTIKILL]: Multikill,
  [EventType.PLAYER_LOADED]: Default,
  [EventType.NEW_ITEM]: Default,
  [EventType.RANDOM]: Default,
  [EventType.DRAGON_KILL]: Default,
  [EventType.HERALD_KILL]: Default,
  [EventType.BARON_KILL]: Default,
}