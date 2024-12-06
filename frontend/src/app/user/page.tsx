import { getEvents } from "@/actions";
import CreateEventDialog from "@/components/CreateEventDialog";
import Events from "@/components/Events";
import SpinnerFull from "@/components/SpinnerFull";
import React, { Suspense } from "react";
import { EventsResponse } from "@/lib/types";
import { toast } from "react-hot-toast";

export default async function UserHomePage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = searchParams.page || "1";

  const res = await getEvents(page);

  const events = res.status === "success" ? (res.data as EventsResponse) : null;

  if (res.status === "error") {
    toast.error(res.data as string);
  }

  return (
    <>
      <div className="min-w-screen min-h-screen pt-14">
        <section className="">
          <div className="container space-y-10">
            <div className="flex justify-between">
              <h2 className="font-bold text-2xl">Events</h2>
              <CreateEventDialog />
            </div>
            <Suspense fallback={<SpinnerFull />} key={page}>
              {events && <Events page={page} events={events} />}
            </Suspense>
          </div>
        </section>
      </div>
    </>
  );
}
