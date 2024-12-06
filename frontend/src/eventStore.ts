import { create } from "zustand";

// Type for event details
export type EventDetails = {
  title: string;
  numOfParticipants: number;
  logoImage: string;
  organisationName: string;
  _id: string;
};

// Zustand store interface
interface EventStore {
  selectedItem: EventDetails | null; // The currently selected event
  setSelectedItem: (item: EventDetails | null) => void; // Function to update the selected item
}

// Create the Zustand store
export const useEventStore = create<EventStore>((set) => ({
  selectedItem: null, // Initially, no event is selected
  setSelectedItem: (item) => set({ selectedItem: item }), // Update selected item
}));
