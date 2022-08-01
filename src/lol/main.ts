
import EventProcessor from "./processors";
import EventTransformers from "./transformers"
import { API } from "../api/api";
import { EventType, LoLEvent } from "../api/model";

const QUEUE: LoLEvent[] = [];

const EVENT_PROCESSORS: {[k in EventType]: (event: any) => Promise<void>} = {
  [EventType.GAME_START]: EventProcessor.GameStart,
  [EventType.CHAMPION_KILL]: EventProcessor.ChampionKill,
  [EventType.MULTIKILL]: EventProcessor.Multikill,
};

const EVENT_TRANSFORMERS: {[k in EventType]: (event: any, transformedData: LoLEvent[]) => void} = {
  [EventType.GAME_START]: EventTransformers.Default,
  [EventType.CHAMPION_KILL]: EventTransformers.Default,
  [EventType.MULTIKILL]: EventTransformers.Multikill,
}

const PROCESSOR = {
  isProcessing: false,
  async process(event: LoLEvent) {
    console.log(event)

    await EVENT_PROCESSORS[event.EventName](event);

    this.isProcessing = false;
  }
}

export const startPolling = () => {
  let lastIndex = 0;
  
  // polling for data and filling queue
  setInterval(async () => {
    const data = await API.getEventData();
    
    if (!data) return; // most likely no game is running, so we return in order to not crash the bot

    let relevantData = data.Events.slice(lastIndex);
    lastIndex = data.Events.length;

    // filter events which the bot doesnt handle currently
    relevantData = relevantData.filter((event) => Object.values(EventType).includes(event.EventName));

    // some events are transformed so they are easier to process
    const transformedData: LoLEvent[] = [];
    relevantData.forEach((event) => EVENT_TRANSFORMERS[event.EventName](event, transformedData));

    QUEUE.push(...transformedData);
  }, 1000);

  // processing queue
  setInterval(() => {
    if (QUEUE.length && !PROCESSOR.isProcessing) {
      const item = QUEUE.shift();
      if (item) {
        PROCESSOR.isProcessing = true;
        PROCESSOR.process(item);
      }
    }
  }, 1000);
}