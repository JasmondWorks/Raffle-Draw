export interface Event {
  _id: string; // Unique identifier for the event
  title: string; // Title of the event
  numOfParticipants: number; // Number of participants in the event
  logoImage: string; // URL or path for the logo image
  organisationName: string; // Name of the organization hosting the event
  userId: string; // ID of the user who created the event
  createdAt: string; // Timestamp when the event was created
  updatedAt: string; // Timestamp when the event was last updated
  __v: number; // Version key used by Mongoose for document versioning
}

export type Result = {
  _id: string;
  eventId: string;
  ticketNumber: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Results = {
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
  data: Result[];
};
