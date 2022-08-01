import { request } from "./request"
import { Champion, LoLEvent } from "./model";

export const API = {
  getEventData(): Promise<{Events: LoLEvent[]}>  {
    return request("/eventdata");
  },
  getPlayerData(): Promise<Champion[]> {
    return request("/playerlist");
  },
  getActivePlayerName(): Promise<string> {
    return request("/activeplayername");
  },
}