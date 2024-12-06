"use client";

import React, { useEffect, useState } from "react";
import { getEvents } from "@/actions";
import Pagination from "@/components/Pagination";
import EventsList from "@/components/EventsList";
import toast from "react-hot-toast";
import { EventsResponse } from "@/lib/types";
import SpinnerFull from "@/components/SpinnerFull";

export default function Events({ page }: { page: string }) {
  const [events, setEvents] = useState<EventsResponse>({
    page: 0,
    limit: 0,
    totalPages: 0,
    totalEvents: 0,
    data: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const events = await getEvents(page);

        setEvents(events);
      } catch (_err) {
        console.log(_err)
        toast.error("Could not load events");
      } finally {
        setIsLoading(false);
      }
    }
    fetchEvents();
  }, [page]);

  console.log(events);

  if (isLoading) return <SpinnerFull />;

  return (
    <>
      {events.data?.length ? (
        <div>
          <div className="overflow-auto">
            <div
              style={{
                display: "grid",
                gap: "2rem",
                gridTemplateColumns: "repeat(4, 250px)",
              }}
              className="py-3 text-neutral-500 font-bold border-b border-neutral-200 w-fit"
            >
              <span>Title</span>
              <span>Organisation name</span>
              <span>Number of participants</span>
              <span>Logo</span>
            </div>
            <EventsList events={events} />
          </div>
          <Pagination page={page} pagesCount={events.totalPages} url="/user" />
        </div>
      ) : (
        <h3 className="text-2xl text-center">You currently have no events</h3>
      )}
    </>
  );
}
