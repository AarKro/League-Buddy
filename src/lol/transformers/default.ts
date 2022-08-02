import { LoLAPIEvent } from "../../api/model";

export const Default = (event: LoLAPIEvent, transformedData: LoLAPIEvent[]) => {
  transformedData.push(event);
}