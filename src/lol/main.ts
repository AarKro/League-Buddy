
import { API } from "../api/api";
import { EventType, LoLAPIEvent, LoLEvent } from "../model";
import { clearGSS, GSS } from "./gameSessionStorage";
import { IDGenerator, saveActivePlayerNameToGSS } from "../utils";
import { EVENT_PROCESSORS } from "./processors";
import { EVENT_TRANSFORMERS } from "./transformers";

export const startLeagueClientProcesses = () => {
  startPlayerDataPolling();
  startEventDataPolling();  
  startRandomEventCreator();
  startProcessor();
}

const PROCESSOR = {
  isProcessing: false,
  async process(event: LoLEvent) {
    console.log(`--------------- ${event.processorId} ${event.EventName} ---------------`);
    console.log(event)

    await EVENT_PROCESSORS[event.EventName](event);

    this.isProcessing = false;
  }
}

const startProcessor = () => {
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
    }, 200);
  }, 5000);
}

const startPlayerDataPolling = () => {
  // polling for player data and filling queue
  setInterval(async () => {
    const data = await API.getPlayerData();

    if (!data || !data.length) return; // most likely no game is running, so we return in order to not crash the bot

    // check for player state based events and add them to queue
    data.forEach((newPlayer) => {
      if (GSS.playerList[newPlayer.summonerName]) { 
        // skip inventory event creation if this is the first time getting player data so we dont have to constantly check for undefined
        const oldPlayer = GSS.playerList[newPlayer.summonerName];

        // check for inventory change event
        const newItems = newPlayer.items.filter((newItem) => !oldPlayer.items.find((oldItem) => newItem.itemID === oldItem.itemID));
        if (newItems.length) {
          newItems.forEach((item) => {
            GSS.queue.push({
              EventName: EventType.NEW_ITEM,
              item: {...item},
              player: {...newPlayer}
            } as LoLEvent);
          });
        }
      } else {
        // player data was added, meaning a new game has begun
        GSS.queue.push({
          EventName: EventType.PLAYER_LOADED,
          player: {...newPlayer},
        } as LoLEvent);
      }

      // save newest player data to GSS
      GSS.playerList[newPlayer.summonerName] = newPlayer;
    });
  }, 1000);
}

const startEventDataPolling = () => {
  // polling for event data and filling queue
  setInterval(async () => {
    const data = await API.getEventData();
    
    if (!data || !data.Events.length) return; // most likely no game is running, so we return in order to not crash the bot
    
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

// creating random events every 15 to 30 mins
const startRandomEventCreator = async () => {
  while (true) {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        GSS.queue.push({
          EventName: EventType.RANDOM
        });
  
        resolve();
      }, (Math.floor(Math.random() * (1800 - 900 + 1)) + 900) * 1000);
    });
  }
}