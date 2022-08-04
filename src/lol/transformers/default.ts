import { LoLAPIEvent } from "../../model";

export const Default = (event: LoLAPIEvent, transformedData: LoLAPIEvent[]) => {
  transformedData.push(event);
}