import { request } from "./request"
import { Player, LoLAPIEvent } from "../model";

export const API = {
  getEventData(): Promise<{Events: LoLAPIEvent[]}>  {
    return request("/eventdata");
  },
  getPlayerData(): Promise<Player[]> {
    return request("/playerlist");
  },
  getActivePlayerName(): Promise<string> {
    return request("/activeplayername");
  },
}