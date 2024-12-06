import EventItem from "@/components/EventItem";
import { Event } from "@/lib/types";

export default function EventsList({ events }: { events: { data: Event[] } }) {
  return (
    <div>
      {events.data?.map((event: Event) => (
        <EventItem key={event._id} event={event} />
      ))}
    </div>
  );
}
