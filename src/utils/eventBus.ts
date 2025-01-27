import mitt from "mitt";

// Define the events and their associated data types
type Events = {
  "player-status-changed": boolean; // Player status (true: playing, false: paused)
  "menu-updated": void; // Example event without any payload
  "need-login": void;
  [key: string]: any; // Allow additional events with any payload
};

// Create and export the Event Bus
export const eventBus = mitt<Events>();
