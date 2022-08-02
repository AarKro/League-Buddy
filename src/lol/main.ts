
import EventProcessor from "./processors";
import EventTransformers from "./transformers"
import { API } from "../api/api";
import { EventType, LoLAPIEvent, LoLEvent } from "../api/model";
import { clearGSS, GSS } from "./gameSessionStorage";
import { IDGenerator, saveActivePlayerNameToGSS } from "../utils";

const EVENT_PROCESSORS: {[k in EventType]: (event: any) => Promise<void>} = {
  [EventType.GAME_START]: EventProcessor.GameStart,
  [EventType.CHAMPION_KILL]: EventProcessor.ChampionKill,
  [EventType.MULTIKILL]: EventProcessor.Multikill,
  [EventType.INVENTORY_CHANGE]: EventProcessor.InventoryChange,
};

const EVENT_TRANSFORMERS: {[k in EventType]: (event: any, transformedData: LoLAPIEvent[]) => void} = {
  [EventType.GAME_START]: EventTransformers.Default,
  [EventType.CHAMPION_KILL]: EventTransformers.Default,
  [EventType.MULTIKILL]: EventTransformers.Multikill,
  [EventType.INVENTORY_CHANGE]: EventTransformers.Default,
}

const PROCESSOR = {
  isProcessing: false,
  async process(event: LoLEvent) {
    console.log(`---------- ${event.processorId} ${event.EventName} ----------`);

    await EVENT_PROCESSORS[event.EventName](event);

    this.isProcessing = false;
  }
}

export const startPolling = async () => {
  // we wait 5 seconds before starting the processor, and clear the queue before hand.
  // this way the bot can be started mid game with skipping the backlog of events and without crashing
  setTimeout(() => {
    GSS.queue = [];
    
    // processing queue
    setInterval(() => {
      if (GSS.queue.length && !PROCESSOR.isProcessing) {
        const item = GSS.queue.shift();
        if (item) {
          const iteratorResult = IDGenerator.next();
          item.processorId = !iteratorResult.done ? iteratorResult.value : undefined;
          
          PROCESSOR.isProcessing = true;
          PROCESSOR.process(item);
        }
      }
    }, 1000);
  }, 5000);

  // polling for player data and filling queue
  setInterval(async () => {
    const data = await API.getPlayerData();

    if (!data) return; // most likely no game is running, so we return in order to not crash the bot

    // check for player state based events and add them to queue
    data.forEach((newPlayer) => {
      if (GSS.playerList[newPlayer.summonerName]) { // skip event creation if this is the first time getting player data so we dont have to constantly check for undefined
        const oldPlayer = GSS.playerList[newPlayer.summonerName];

        // check for inventory change event
        if (newPlayer.items.length !== oldPlayer.items.length || newPlayer.items.some((newItem) => !oldPlayer.items.find((oldItem) => newItem.itemID === oldItem.itemID))) {
          GSS.queue.push({
            EventName: EventType.INVENTORY_CHANGE,
            oldPlayer: {...oldPlayer},
            newPlayer: {...newPlayer},
          } as LoLEvent);
        }
      }  

      // save newest player data to GSS
      GSS.playerList[newPlayer.summonerName] = newPlayer;
    });
  }, 1000);
  
  // polling for event data and filling queue
  setInterval(async () => {
    const data = await API.getEventData();
    
    if (!data) return; // most likely no game is running, so we return in order to not crash the bot
    
    // if we are in a new game we have to do some prep and resets for everything to work
    if (GSS.lastEventDataIndex === 0 || GSS.lastEventDataIndex > data.Events.length) {
      console.log("==============================")
      clearGSS();
      saveActivePlayerNameToGSS();
    }

    let relevantData = data.Events.slice(GSS.lastEventDataIndex);
    GSS.lastEventDataIndex = data.Events.length;

    // filter events which the bot doesnt handle currently
    relevantData = relevantData.filter((event) => Object.values(EventType).includes(event.EventName));

    // some events are transformed so they are easier to process
    const transformedData: LoLAPIEvent[] = [];
    relevantData.forEach((event) => EVENT_TRANSFORMERS[event.EventName](event, transformedData));

    GSS.queue.push(...transformedData);
  }, 1000);
}