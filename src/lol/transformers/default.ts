import { LoLEvent } from "../../api/model";

export const Default = (event: LoLEvent, transformedData: LoLEvent[]) => {
  transformedData.push(event);
}