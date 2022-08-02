import { LoLAPIEvent, MultikillEvent } from "../../api/model";

export const Multikill = (event: MultikillEvent, transformedData: LoLAPIEvent[]) => {
  transformedData[transformedData.length - 1] = {...transformedData[transformedData.length - 1], ...event};
}