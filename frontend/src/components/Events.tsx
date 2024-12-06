import React from "react";
import { getEvents } from "@/actions";
import Pagination from "@/components/Pagination";
import EventsList from "@/components/EventsList";

export default async function Events({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = searchParams.page;

  const events = await getEvents(searchParams.page);

  console.log(events);
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
