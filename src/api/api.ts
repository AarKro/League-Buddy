import { request } from "./request"
import { Champion, LoLAPIEvent } from "./model";

export const API = {
  getEventData(): Promise<{Events: LoLAPIEvent[]}>  {
    return request("/eventdata");
  },
  getPlayerData(): Promise<Champion[]> {
    return request("/playerlist");
  },
  getActivePlayerName(): Promise<string> {
    return request("/activeplayername");
  },
}