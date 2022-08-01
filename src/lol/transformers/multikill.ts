import { LoLEvent, MultikillEvent } from "../../api/model";

export const Multikill = (event: MultikillEvent, transformedData: LoLEvent[]) => {
  transformedData[transformedData.length - 1] = {...transformedData[transformedData.length - 1], ...event};
}